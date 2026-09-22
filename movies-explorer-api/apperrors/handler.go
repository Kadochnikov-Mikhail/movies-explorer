package apperrors

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func ErrorHandler(c *fiber.Ctx, err error) error {
	status := fiber.StatusInternalServerError
	message := "Ошибка по умолчанию."

	var fiberError *fiber.Error

	switch {
	case errors.Is(err, ErrBadRequest):
		status = fiber.StatusBadRequest
		message = err.Error()

	case errors.Is(err, ErrUnauthorized):
		status = fiber.StatusUnauthorized
		message = err.Error()

	case errors.Is(err, ErrForbidden):
		status = fiber.StatusForbidden
		message = err.Error()

	case errors.Is(err, mongo.ErrNoDocuments):
		status = fiber.StatusNotFound
		message = "Ресурс не найден."

	case errors.As(err, &fiberError):
		status = fiberError.Code
		message = fiberError.Message

	case errors.Is(err, ErrConflict):
		status = fiber.StatusConflict
		message = err.Error()
	}

	return c.Status(status).JSON(fiber.Map{
		"message": message,
	})
}
