package main

import (
	"flag"
	"os"
	"path"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func parseArgs() (string, string) {
	portFlag := flag.String("port", "3000", "port number")
	dirFlag := flag.String("dir", "./", "directory to serve")
	flag.Parse()

	return *portFlag, *dirFlag
}

func main() {
	port, dir := parseArgs()

	app := fiber.New()
	app.Use(func(c *fiber.Ctx) error {
		c.Locals("dir", dir)
		return c.Next()
	})

	app.Use(logger.New())

	app.Static("/data", dir, fiber.Static{
		ByteRange: true,
	})
	app.Get("/ls", lsController)

	app.Listen(":" + port)
}

func lsController(c *fiber.Ctx) error {
	dir := c.Locals("dir").(string)
	location := c.Query("d")
	target := path.Join(dir, location)
	files, err := os.ReadDir(target)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}
	fileNames := []string{}
	for _, file := range files {
		fileNames = append(fileNames, file.Name())
	}
	return c.Status(200).JSON(fiber.Map{
		"files": fileNames,
	})
}
