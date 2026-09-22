package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"

	"github.com/Kadochnikov-Mikhail/movies-explorer-api/apperrors"
)

func Auth(jwtSecret string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		authorization := c.Get("Authorization")

		if authorization == "" ||
			!strings.HasPrefix(authorization, "Bearer ") {
			return apperrors.ErrUnauthorized
		}

		tokenString := strings.TrimPrefix(authorization, "Bearer ")

		token, err := jwt.Parse(
			tokenString,
			func(token *jwt.Token) (interface{}, error) {
				if token.Method != jwt.SigningMethodHS256 {
					return nil, apperrors.ErrUnauthorized
				}

				return []byte(jwtSecret), nil
			},
		)

		if err != nil || !token.Valid {
			return apperrors.ErrUnauthorized
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return apperrors.ErrUnauthorized
		}

		userID, ok := claims["_id"].(string)
		if !ok {
			return apperrors.ErrUnauthorized
		}

		c.Locals("userID", userID)

		return c.Next()
	}
}
