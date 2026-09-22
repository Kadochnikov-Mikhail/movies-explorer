package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Movie struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	NameRU      string             `bson:"nameRU" json:"nameRU"`
	NameEN      string             `bson:"nameEN" json:"nameEN"`
	Country     string             `bson:"country" json:"country"`
	Director    string             `bson:"director" json:"director"`
	Duration    int                `bson:"duration" json:"duration"`
	Image       string             `bson:"image" json:"image"`
	TrailerLink string             `bson:"trailerLink" json:"trailerLink"`
	Thumbnail   string             `bson:"thumbnail" json:"thumbnail"`
	Owner       primitive.ObjectID `bson:"owner" json:"owner"`
	MovieID     int                `bson:"movieId" json:"movieId"`
}
