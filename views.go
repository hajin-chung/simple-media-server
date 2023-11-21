package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
)

func DirView(location string, c *fiber.Ctx) error {
	files := []File{}
	os_files, err := os.ReadDir(location)
	if err != nil {
		return ErrorView(err.Error(), c)
	}

	for _, file := range os_files {
		fileName := file.Name()
		if len(fileName) == 0 {
			continue
		} else if fileName[0] == '.' {
			continue
		}

		if file.IsDir() {
			files = append(files, File{Dir, "", fileName})
		} else {
			files = append(files, File{
				getFileType(fileName), getFileExt(fileName), getFileName(fileName)})
		}
	}
	// TODO: sort files in dir, video, music, image, text order + name

	return c.Render("dir", fiber.Map{
		"Location": location,
		"Files":    files,
	}, "layout")
}

func ErrorView(message string, c *fiber.Ctx) error {
	return c.Render("error", fiber.Map{
		"Message": message,
	}, "layout")
}
