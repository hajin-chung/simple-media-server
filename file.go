package main

import (
	"os"
	"path"
)

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
