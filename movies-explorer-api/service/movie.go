package service

import (
	"context"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/Kadochnikov-Mikhail/movies-explorer-api/apperrors"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/models"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/repository"
)

type MovieService struct {
	movieRepository *repository.MovieRepository
}

func NewMovieService(
	movieRepository *repository.MovieRepository,
) *MovieService {
	return &MovieService{
		movieRepository: movieRepository,
	}
}

func (s *MovieService) GetMovies(
	ctx context.Context,
	userID string,
) ([]models.Movie, error) {
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, apperrors.ErrUnauthorized
	}

	return s.movieRepository.FindByOwner(ctx, objectID)
}

func (s *MovieService) Create(
	ctx context.Context,
	userID string,
	movie *models.Movie,
) (*models.Movie, error) {
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, apperrors.ErrUnauthorized
	}

	movie.Owner = objectID

	return s.movieRepository.Create(ctx, movie)
}

func (s *MovieService) Delete(
	ctx context.Context,
	userID string,
	movieID string,
) (*models.Movie, error) {
	ownerID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, apperrors.ErrUnauthorized
	}

	objectID, err := primitive.ObjectIDFromHex(movieID)
	if err != nil {
		return nil, apperrors.ErrBadRequest
	}

	return s.movieRepository.Delete(
		ctx,
		objectID,
		ownerID,
	)
}
