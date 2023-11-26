package main

import (
	"errors"
	"log"
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

func UploadController(c *fiber.Ctx) error {
	base := c.Locals("base").(string)
	filePath := c.Query("path")
	fullPath := path.Join(base, filePath)
	log.Println(fullPath)
	_, err := os.Stat(fullPath)
	if errors.Is(err, os.ErrNotExist) {
		err := os.WriteFile(fullPath, c.BodyRaw(), 0666)
		if err != nil {
			log.Println("write file error", err.Error())
			return c.Status(500).JSON(fiber.Map{"error": true, "msg": err.Error()})
		}
		return c.Status(200).JSON(fiber.Map{"error": false})
	} else {
		log.Println("stat error", err.Error())
		return c.Status(500).JSON(fiber.Map{
			"error": true,
			"msg":   "file already exists",
		})
	}
}
