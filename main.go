package main

import (
	"flag"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/template/html/v2"
)

func parseArgs() (string, string) {
	portFlag := flag.String("port", "3000", "port number")
	dirFlag := flag.String("dir", "./", "directory to serve")
	flag.Parse()

	return *portFlag, *dirFlag
}

func main() {
	port, dir := parseArgs()

	engine := html.New("./views", ".html")
	app := fiber.New(fiber.Config{
		Views: engine,
		DisableStartupMessage: true,
	})
	app.Use(func(c *fiber.Ctx) error {
		c.Locals("base", dir)
		return c.Next()
	})

	app.Use(logger.New())

	app.Static("/data", dir, fiber.Static{ByteRange: true})
	app.Static("/static", "static")
	app.Get("/api/ls", LsController)
	app.Get("/*", MediaController)

	app.Listen(":" + port)
}

