(() => {
  const path = document.location.pathname;
  const content = document.querySelector("pre");

  fetch(`/data${path}`)
    .then(res => res.text())
    .then(text => {
      content.innerHTML = text;
    });
})()
