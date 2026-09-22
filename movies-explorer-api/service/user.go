package service

import (
	"context"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"

	"github.com/Kadochnikov-Mikhail/movies-explorer-api/apperrors"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/models"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/repository"
)

type UserService struct {
	userRepository *repository.UserRepository
}

func NewUserService(userRepository *repository.UserRepository) *UserService {
	return &UserService{
		userRepository: userRepository,
	}
}

func (s *UserService) Create(
	ctx context.Context,
	name string,
	email string,
	password string,
) (*models.User, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		return nil, err
	}

	user := &models.User{
		Name:     name,
		Email:    email,
		Password: string(hashedPassword),
	}

	user, err = s.userRepository.Create(ctx, user)
	if err != nil {
		if mongo.IsDuplicateKeyError(err) {
			return nil, apperrors.ErrConflict
		}

		return nil, err
	}

	return user, nil
}

func (s *UserService) Login(
	ctx context.Context,
	email string,
	password string,
	jwtSecret string,
) (string, error) {
	user, err := s.userRepository.FindByEmail(ctx, email)
	if err != nil {
		return "", apperrors.ErrUnauthorized
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(password),
	)
	if err != nil {
		return "", apperrors.ErrUnauthorized
	}

	claims := jwt.MapClaims{
		"_id": user.ID.Hex(),
		"exp": time.Now().Add(7 * 24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(
		jwt.SigningMethodHS256,
		claims,
	)

	return token.SignedString([]byte(jwtSecret))
}

func (s *UserService) GetMe(
	ctx context.Context,
	userID string,
) (*models.User, error) {
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, apperrors.ErrUnauthorized
	}

	return s.userRepository.FindByID(ctx, objectID)
}

func (s *UserService) Update(
	ctx context.Context,
	userID string,
	name string,
	email string,
) (*models.User, error) {
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, apperrors.ErrUnauthorized
	}

	user, err := s.userRepository.Update(
		ctx,
		objectID,
		name,
		email,
	)
	if err != nil {
		if mongo.IsDuplicateKeyError(err) {
			return nil, apperrors.ErrConflict
		}

		return nil, err
	}

	return user, nil
}
