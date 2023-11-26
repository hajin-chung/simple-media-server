function upload() {
  const path = document.getElementById("path").innerHTML;
  const fileInput = document.getElementById("fileInput");
  const uploadButton = document.getElementById("fileUpload");

  uploadButton.addEventListener("click", () => {
    fileInput.click()
  })

  fileInput.addEventListener("change", async () => {
    const files = [...fileInput.files]

    const uploadPromises = files.map((file) =>
      fetch(`/upload?path=${path}${file.name}`, {
        method: "POST",
        header: {
          "Content-Type": "null",
        },
        body: file
      })
    )
    await Promise.all(uploadPromises)


    fileInput.value = null;
  })
}

upload();
