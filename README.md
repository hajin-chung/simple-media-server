# Simple Media Server

Simple Media Server with a default web interface and a api for extension

mainly video streaming purposes.

# Targets

- [ ] delete file
- [ ] change file, directory name
- [ ] video uploading (transmuxes to streamable mp4)
- [ ] image uploading
- [ ] metadata on directories, videos, photos, music 
   (thumbnail, description, additional info)
- [ ] save last location on video

# API spec

1. ls
   - method: GET
   - url: `/ls?d=[location]`

