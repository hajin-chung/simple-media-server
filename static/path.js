const homeIcon = document.createElement("img");
homeIcon.src = "/static/icons/home.svg";
const homeLink = document.createElement("a");
homeLink.href = "/";
homeLink.appendChild(homeIcon);
homeLink.classList.add("home");

const path = document.querySelector(".path");
const entries = path.innerHTML.split("/");
path.innerHTML = "";
path.appendChild(homeLink);

entries.reduce((acc, entry) => {
  const atag = document.createElement("a");
  const currentDir = acc + '/' + entry;
  atag.href = currentDir;
  atag.innerHTML = '/' + entry;
  path.appendChild(atag);
  console.log({acc, entry, atag})

  return currentDir;
}, '')
