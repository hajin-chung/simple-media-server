const isMobile = checkMobile();
const player = document.getElementById("player");
const controls = document.querySelector(".controls");
const bottomControls = document.querySelector(".controls > .bottom")
const playButton = document.querySelector(".controls .play");
const fullscreenButton = document.querySelector(".controls .fullscreen");
const video = document.getElementById("video");
const playlist = document.querySelector(".playlist");
const playlistButton = document.querySelector(".playlistButton");
const progressBar = document.querySelector(".progress-bar");
const playedBar = document.querySelector(".played-bar");
const loadedBar = document.querySelector(".loaded-bar");

let isPlaylistOpen = false;

function togglePlaylist() {
  if (isPlaylistOpen) playlist.classList.add("hide");
  else playlist.classList.remove("hide");
  isPlaylistOpen = !isPlaylistOpen;
}

playlistButton.addEventListener("click", (e) => {
  e.stopPropagation();
  togglePlaylist();
})

let hideTimeout = undefined;
if (!isMobile) {
  player.addEventListener("mousemove", () => {
    showControls();
    if (hideTimeout !== undefined) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      hideControls();
    }, 3000)
  });
} else {
  player.addEventListener("click", () => {
    if (hideTimeout !== undefined) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      hideControls();
    }, 3000)
  });
}

let isShowingControls = true;
function showControls() {
  isShowingControls = true;
  controls.style.opacity = "1";
  document.body.style.cursor = "auto";
}

function hideControls() {
  isShowingControls = false;
  controls.style.opacity = "0";
  document.body.style.cursor = "none";
}

function playVideo() {
  if (video.paused) video.play();
  else video.pause();
}

function fullscreen() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

playButton.addEventListener("click", (e) => {
  e.stopPropagation();
  playVideo();
})

fullscreenButton.addEventListener("click", (e) => {
  e.stopPropagation();
  fullscreen();
})

bottomControls.addEventListener("click", (e) => e.stopPropagation())

player.addEventListener("click", () => {
  if (!isMobile) playVideo();
  else {
    if (isShowingControls) hideControls();
    else showControls();
  }
})

player.addEventListener("mouseleave", () => {
  hideControls();
})

progressBar.addEventListener("click", (e) => {
  console.log(e.clientX);
  const percent = (e.clientX - 12) / progressBar.clientWidth;
  video.currentTime = percent * video.duration;
});

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  playedBar.style.width = `${percent}%`;
}
video.addEventListener("timeupdate", handleProgress)

