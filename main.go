package main

import (
	"flag"
	"log"

	"github.com/gofiber/fiber/v2"
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

	app.Static("/data", dir, fiber.Static{
		ByteRange: true,
	})
	app.Get("/ls", lsController)

	app.Listen(":" + port)
}

func lsController(c *fiber.Ctx) error {
	dir := c.Locals("dir").(string)
	location := c.Query("d")
	log.Println(dir + location)

	return c.Send([]byte(location))
}
