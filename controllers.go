package main

import (
	"os"
	"path"

	"github.com/gofiber/fiber/v2"
)

func LsController(c *fiber.Ctx) error {
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
		fileName := file.Name()
		if file.Type().IsDir() {
			fileName += "/"
		}
		fileNames = append(fileNames, fileName)
	}

	return c.Status(200).JSON(fiber.Map{
		"files": fileNames,
	})
}

func StyleController(c *fiber.Ctx) error {
	return c.SendFile("views/style.css")
}

func MediaController(c *fiber.Ctx) error {
	dir := c.Locals("dir").(string)
	location := c.Params("*")
	target := path.Join(dir, location)
	isdir, err := isDir(target)
	if err != nil {
		return ErrorView(err.Error(), c)
	}

	if isdir {
		return DirView(target, c)
	}

	fileType := getFileType(target)

	switch fileType {
	case Video:
	case Music:
	case Text:
	case Err:
		return ErrorView(err.Error(), c)
	}
	return ErrorView("hi", c)
}

