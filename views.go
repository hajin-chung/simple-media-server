package main

import (
	"os"
	"path"

	"github.com/gofiber/fiber/v2"
)

func DirView(base string, filePath string, c *fiber.Ctx) error {
	files, err := getDirList(path.Join(base, filePath))
	if err != nil {
		return ErrorView(err.Error(), c)
	}

	return c.Render("dir", fiber.Map{
		"Path": filePath,
		"Files": files,
	}, "layout")
}

func VideoView(base string, filePath string, c *fiber.Ctx) error {
	fullPath := path.Join(base, filePath)
	_, err := os.Open(path.Join(fullPath))
	if err != nil {
		return ErrorView(err.Error(), c)
	}
	parentPath, _ := path.Split(fullPath)
	playlist, err := getDirList(parentPath)
	if err != nil {
		return ErrorView(err.Error(), c)
	}

	return c.Render("video", fiber.Map{
		"Path": filePath,
		"PlayList": playlist,
	}, "layout")
}

func ErrorView(message string, c *fiber.Ctx) error {
	return c.Render("error", fiber.Map{
		"Message": message,
	}, "layout")
}
