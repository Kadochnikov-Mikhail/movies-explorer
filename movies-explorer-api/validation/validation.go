package validation

import (
	"net/mail"
	"net/url"
	"strings"

	"github.com/Kadochnikov-Mikhail/movies-explorer-api/models"
)

func ValidateName(name string) bool {
	name = strings.TrimSpace(name)

	return len([]rune(name)) >= 2 &&
		len([]rune(name)) <= 30
}

func ValidateEmail(email string) bool {
	_, err := mail.ParseAddress(email)

	return err == nil
}

func ValidatePassword(password string) bool {
	return strings.TrimSpace(password) != ""
}

func ValidateURL(value string) bool {
	parsedURL, err := url.ParseRequestURI(value)
	if err != nil {
		return false
	}

	return parsedURL.Scheme == "http" ||
		parsedURL.Scheme == "https"
}

func ValidateMovie(movie models.Movie) bool {
	return movie.Country != "" &&
		movie.Director != "" &&
		movie.Duration > 0 &&
		movie.Image != "" &&
		ValidateURL(movie.Image) &&
		movie.TrailerLink != "" &&
		ValidateURL(movie.TrailerLink) &&
		movie.NameRU != "" &&
		movie.NameEN != "" &&
		movie.Thumbnail != "" &&
		ValidateURL(movie.Thumbnail) &&
		movie.MovieID > 0
}
