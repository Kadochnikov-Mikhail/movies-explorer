package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"

	"github.com/Kadochnikov-Mikhail/movies-explorer-api/apperrors"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/config"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/handlers"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/middleware"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/repository"
	"github.com/Kadochnikov-Mikhail/movies-explorer-api/service"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}

	dbClient, err := config.ConnectDatabase(cfg.DatabaseURL)
	if err != nil {
		log.Fatal(err)
	}
	defer dbClient.Disconnect(context.Background())

	db := dbClient.Database("moviesdb")

	userRepository := repository.NewUserRepository(db)

	if err := userRepository.EnsureIndexes(context.Background()); err != nil {
		log.Fatal(err)
	}

	movieRepository := repository.NewMovieRepository(db)

	userService := service.NewUserService(userRepository)
	movieService := service.NewMovieService(movieRepository)

	userHandler := handlers.NewUserHandler(
		userService,
		cfg.JWTSecret,
	)

	movieHandler := handlers.NewMovieHandler(movieService)

	app := fiber.New(fiber.Config{
		ErrorHandler: apperrors.ErrorHandler,
	})

	app.Use(middleware.Logger())
	app.Use(helmet.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3001",
		AllowMethods: "GET,POST,PATCH,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "ok",
		})
	})

	app.Post("/signup", userHandler.Register)
	app.Post("/signin", userHandler.Login)

	protected := app.Group("", middleware.Auth(cfg.JWTSecret))

	protected.Get("/users/me", userHandler.GetMe)
	protected.Patch("/users/me", userHandler.Update)

	protected.Get("/movies", movieHandler.GetMovies)
	protected.Post("/movies", movieHandler.Create)
	protected.Delete("/movies/:_id", movieHandler.Delete)

	app.Use(func(c *fiber.Ctx) error {
		return apperrors.ErrNotFound
	})

	go func() {
		if err := app.Listen(":" + cfg.Port); err != nil {
			log.Fatal(err)
		}
	}()

	signalChannel := make(chan os.Signal, 1)
	signal.Notify(signalChannel, os.Interrupt, syscall.SIGTERM)

	<-signalChannel

	shutdownCtx, cancel := context.WithTimeout(
		context.Background(),
		5*time.Second,
	)
	defer cancel()

	if err := app.ShutdownWithContext(shutdownCtx); err != nil {
		log.Fatal(err)
	}
}
