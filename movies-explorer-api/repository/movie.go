package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/Kadochnikov-Mikhail/movies-explorer-api/apperrors"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/models"
)

type MovieRepository struct {
	collection *mongo.Collection
}

func NewMovieRepository(db *mongo.Database) *MovieRepository {
	return &MovieRepository{
		collection: db.Collection("movies"),
	}
}

func (r *MovieRepository) FindByOwner(
	ctx context.Context,
	ownerID primitive.ObjectID,
) ([]models.Movie, error) {
	cursor, err := r.collection.Find(ctx, bson.M{"owner": ownerID})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	movies := make([]models.Movie, 0)

	if err := cursor.All(ctx, &movies); err != nil {
		return nil, err
	}

	return movies, nil
}

func (r *MovieRepository) Create(
	ctx context.Context,
	movie *models.Movie,
) (*models.Movie, error) {
	result, err := r.collection.InsertOne(ctx, movie)
	if err != nil {
		return nil, err
	}

	movie.ID = result.InsertedID.(primitive.ObjectID)

	return movie, nil
}

func (r *MovieRepository) Delete(
	ctx context.Context,
	movieID primitive.ObjectID,
	ownerID primitive.ObjectID,
) (*models.Movie, error) {
	var movie models.Movie

	err := r.collection.FindOne(
		ctx,
		bson.M{"_id": movieID},
	).Decode(&movie)
	if err != nil {
		return nil, err
	}

	if movie.Owner != ownerID {
		return nil, apperrors.ErrForbidden
	}

	_, err = r.collection.DeleteOne(
		ctx,
		bson.M{"_id": movieID},
	)
	if err != nil {
		return nil, err
	}

	return &movie, nil
}
