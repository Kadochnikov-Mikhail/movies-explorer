package handlers

import (
	"github.com/gofiber/fiber/v2"

	"github.com/Kadochnikov-Mikhail/movies-explorer-api/models"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/service"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/validation"
)

type MovieHandler struct {
	movieService *service.MovieService
}

func NewMovieHandler(
	movieService *service.MovieService,
) *MovieHandler {
	return &MovieHandler{
		movieService: movieService,
	}
}

func (h *MovieHandler) GetMovies(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)

	movies, err := h.movieService.GetMovies(
		c.Context(),
		userID,
	)
	if err != nil {
		return err
	}

	return c.JSON(fiber.Map{
		"movies": movies,
	})
}

func (h *MovieHandler) Create(c *fiber.Ctx) error {
	var movie models.Movie

	if err := c.BodyParser(&movie); err != nil {
		return fiber.ErrBadRequest
	}

	if !validation.ValidateMovie(movie) {
		return fiber.ErrBadRequest
	}

	userID := c.Locals("userID").(string)

	createdMovie, err := h.movieService.Create(
		c.Context(),
		userID,
		&movie,
	)
	if err != nil {
		return err
	}

	return c.JSON(fiber.Map{
		"movie": createdMovie,
	})
}

func (h *MovieHandler) Delete(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)
	movieID := c.Params("_id")

	deletedMovie, err := h.movieService.Delete(
		c.Context(),
		userID,
		movieID,
	)
	if err != nil {
		return err
	}

	return c.JSON(deletedMovie)
}
