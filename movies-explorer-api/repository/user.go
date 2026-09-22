package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/Kadochnikov-Mikhail/movies-explorer-api/models"
)

type UserRepository struct {
	collection *mongo.Collection
}

func NewUserRepository(db *mongo.Database) *UserRepository {
	return &UserRepository{
		collection: db.Collection("users"),
	}
}

func (r *UserRepository) EnsureIndexes(ctx context.Context) error {
	_, err := r.collection.Indexes().CreateOne(
		ctx,
		mongo.IndexModel{
			Keys: bson.D{
				{Key: "email", Value: 1},
			},
			Options: options.Index().SetUnique(true),
		},
	)

	return err
}

func (r *UserRepository) FindByEmail(
	ctx context.Context,
	email string,
) (*models.User, error) {
	var user models.User

	err := r.collection.FindOne(
		ctx,
		bson.M{"email": email},
	).Decode(&user)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) FindByID(
	ctx context.Context,
	id primitive.ObjectID,
) (*models.User, error) {
	var user models.User

	err := r.collection.FindOne(
		ctx,
		bson.M{"_id": id},
	).Decode(&user)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) Create(
	ctx context.Context,
	user *models.User,
) (*models.User, error) {
	result, err := r.collection.InsertOne(ctx, user)
	if err != nil {
		return nil, err
	}

	user.ID = result.InsertedID.(primitive.ObjectID)

	return user, nil
}

func (r *UserRepository) Update(
	ctx context.Context,
	id primitive.ObjectID,
	name string,
	email string,
) (*models.User, error) {
	var user models.User

	err := r.collection.FindOneAndUpdate(
		ctx,
		bson.M{"_id": id},
		bson.M{
			"$set": bson.M{
				"name":  name,
				"email": email,
			},
		},
		options.FindOneAndUpdate().SetReturnDocument(options.After),
	).Decode(&user)

	if err != nil {
		return nil, err
	}

	return &user, nil
}
