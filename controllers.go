package main

import (
	"fmt"
	"net/url"
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
	fileName := c.Params("*")
	return c.SendFile(fmt.Sprintf("views/%s.css", fileName))
}

func MediaController(c *fiber.Ctx) error {
	base := c.Locals("base").(string)
	filePath := c.Params("*")
	filePath, err := url.QueryUnescape(filePath)
	if err != nil {
		return ErrorView(err.Error(), c)
	}

	fullPath := path.Join(base, filePath)
	isdir, err := isDir(fullPath)
	if err != nil {
		return ErrorView(err.Error(), c)
	}

	if isdir {
		return DirView(base, filePath, c)
	}

	fileType := getFileType(fullPath)

	switch fileType {
	case Video:
		return VideoView(base, filePath, c)
	case Music:
	case Text:
		return TextView(base, filePath, c)
	case Err:
		return ErrorView(err.Error(), c)
	}
	return ErrorView("hi", c)
}
