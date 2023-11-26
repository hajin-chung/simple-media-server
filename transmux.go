package main

import (
	"bufio"
	"log"
	"os/exec"
)

func VideoTransmux(fullPath string) {
	fileExt := getFileExt(fullPath)
	outPath := fullPath[:len(fullPath)-len(fileExt)] + ".mp4"
	cmd := exec.Command(
		"ffmpeg", "-hide_banner", "-progress", "-", "-nostats", "-i", fullPath, outPath)
	stdout, err := cmd.StderrPipe()
	if err != nil {
		log.Printf("error stdout pipe of ffempg: %s\n", err.Error())
		return
	}

	err = cmd.Start()
	if err != nil {
		log.Printf("error cmd start: %s\n", err.Error())
	}

	buf := bufio.NewReader(stdout)
	for {
		line, _, err := buf.ReadLine()
		if err != nil {
			log.Printf("error stdout read: %s\n", err.Error())
			break
		}
		log.Println(string(line))
	}

	err = cmd.Wait()
	if err != nil {
		log.Printf("error transmuxing video %s: %s\n", fullPath, err.Error())
		return
	}
}
