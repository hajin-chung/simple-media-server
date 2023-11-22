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
	Path string
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
	if len(extension) == 0 {
		return Text
	}

	extension = extension[1:]
	switch extension {
	case "mp4", "ts":
		return Video
	case "mp3":
		return Music
	case "jpg", "png", "jpeg":
		return Image
	default:
		return Text
	}
}

func getDirList(path string) ([]File, error) {
	files := []File{}
	os_files, err := os.ReadDir(path)
	if err != nil {
		return nil, err
	}

	for _, file := range os_files {
		fileName := file.Name()
		if len(fileName) == 0 {
			continue
		} else if fileName[0] == '.' {
			continue
		}
		println(fileName)

		if file.IsDir() {
			files = append(files, File{Dir, "", fileName, fileName})
		} else {
			files = append(files, File{
				getFileType(fileName),
				getFileExt(fileName),
				getFileName(fileName),
				fileName,
			})
		}
	}
	// TODO: sort files in dir, video, music, image, text order + name
	return files, nil
}
