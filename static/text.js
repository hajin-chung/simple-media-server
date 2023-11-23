const path = document.querySelector("#title").innerHTML;
const content = document.querySelector("pre");

fetch(`/data/${path}`)
  .then(res => res.text())
  .then(text => {
    content.innerHTML = text;
  });
