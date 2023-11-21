package main

import (
	"flag"
	"log"
	"os"
	"path"

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
	})
	app.Use(func(c *fiber.Ctx) error {
		c.Locals("dir", dir)
		return c.Next()
	})

	app.Use(logger.New())

	app.Static("/data", dir, fiber.Static{ByteRange: true})
	app.Get("/api/ls", lsController)
	app.Get("/style.css", StyleController)
	app.Get("/*", mediaController)

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

func mediaController(c *fiber.Ctx) error {
	dir := c.Locals("dir").(string)
	location := c.Params("*")
	target := path.Join(dir, location)
	isdir, err := isDir(target)
	if err != nil {
		log.Println(err)
		return ErrorView(err, c)
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
		return ErrorView(err, c)
	}
	return ErrorView(nil, c)
}

type FileType string

const (
	Dir   FileType = "dir"
	Music FileType = "music"
	Video FileType = "video"
	Image FileType = "image"
	Text  FileType = "text"
	Err   FileType = ""
)

type File struct {
	Type FileType
	Ext  string
	Name string
}

func DirView(location string, c *fiber.Ctx) error {
	files := []File{}
	// if location == "." {
	// 	location = "./"
	// }
	log.Println(location)
	os_files, err := os.ReadDir(location)
	if err != nil {
		return ErrorView(err, c)
	}

	for _, file := range os_files {
		fileName := file.Name()
		if file.IsDir() {
			files = append(files, File{
				Dir, getFileExt(fileName), getFileName(fileName)})
		} else {
			name := file.Name()
			files = append(files, File{
				getFileType(name), getFileExt(fileName), getFileName(name)})
		}
	}

	return c.Render("dir", fiber.Map{
		"Location": location,
		"Files":    files,
	}, "layout")
}

func ErrorView(err error, c *fiber.Ctx) error {
	return c.Render("error", fiber.Map{
		"Message": err.Error(),
	}, "layout")
}

func isDir(target string) (bool, error) {
	file, err := os.Open(target)
	defer file.Close()
	if err != nil {
		return false, err
	}

	fileInfo, err := file.Stat()
	if err != nil {
		return false, err
	}

	if fileInfo.IsDir() {
		return true, nil
	}
	return false, nil
}

func getFileName(filename string) string {
	return filename[:len(filename)-len(path.Ext(filename))]
}

func getFileExt(filename string) string {
	return path.Ext(filename)
}

func getFileType(target string) FileType {
	extension := path.Ext(target)
	switch extension {
	case "mp4":
		return Video
	case "mp3":
		return Music
	case "jpg", "png", "jpeg":
		return Image
	default:
		return Text
	}
}
