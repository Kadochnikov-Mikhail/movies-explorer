package handlers

import (
	"github.com/gofiber/fiber/v2"

	"github.com/Kadochnikov-Mikhail/movies-explorer-api/service"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/validation"
)

type UserHandler struct {
	userService *service.UserService
	jwtSecret   string
}

func NewUserHandler(
	userService *service.UserService,
	jwtSecret string,
) *UserHandler {
	return &UserHandler{
		userService: userService,
		jwtSecret:   jwtSecret,
	}
}

type registerRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type updateUserRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func (h *UserHandler) Register(c *fiber.Ctx) error {
	var request registerRequest

	if err := c.BodyParser(&request); err != nil {
		return fiber.ErrBadRequest
	}

	if !validation.ValidateName(request.Name) ||
		!validation.ValidateEmail(request.Email) ||
		!validation.ValidatePassword(request.Password) {
		return fiber.ErrBadRequest
	}

	user, err := h.userService.Create(
		c.Context(),
		request.Name,
		request.Email,
		request.Password,
	)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"name":  user.Name,
		"_id":   user.ID,
		"email": user.Email,
	})
}

func (h *UserHandler) Login(c *fiber.Ctx) error {
	var request loginRequest

	if err := c.BodyParser(&request); err != nil {
		return fiber.ErrBadRequest
	}

	if !validation.ValidateEmail(request.Email) ||
		!validation.ValidatePassword(request.Password) {
		return fiber.ErrBadRequest
	}

	token, err := h.userService.Login(
		c.Context(),
		request.Email,
		request.Password,
		h.jwtSecret,
	)
	if err != nil {
		return err
	}

	return c.JSON(fiber.Map{
		"token": token,
	})
}

func (h *UserHandler) GetMe(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)

	user, err := h.userService.GetMe(
		c.Context(),
		userID,
	)
	if err != nil {
		return err
	}

	return c.JSON(fiber.Map{
		"user": user,
	})
}

func (h *UserHandler) Update(c *fiber.Ctx) error {
	var request updateUserRequest

	if err := c.BodyParser(&request); err != nil {
		return fiber.ErrBadRequest
	}

	if !validation.ValidateName(request.Name) ||
		!validation.ValidateEmail(request.Email) {
		return fiber.ErrBadRequest
	}

	userID := c.Locals("userID").(string)

	user, err := h.userService.Update(
		c.Context(),
		userID,
		request.Name,
		request.Email,
	)
	if err != nil {
		return err
	}

	return c.JSON(fiber.Map{
		"user": user,
	})
}
