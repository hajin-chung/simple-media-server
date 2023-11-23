const isMobile = checkMobile();
const player = document.getElementById("player");
const controls = document.querySelector(".controls");
const bottomControls = document.querySelector(".controls > .bottom")
const playButton = document.querySelector(".controls .play");
const playButtonIcon = document.querySelector(".controls .play img");
const fullscreenButton = document.querySelector(".controls .fullscreen");
const fullscreenButtonIcon = document.querySelector(".controls .fullscreen img");
const video = document.getElementById("video");
const playlist = document.querySelector(".playlist");
const playlistButton = document.querySelector(".playlistButton");
const progressBar = document.querySelector(".progress-bar");
const playedBar = document.querySelector(".played-bar");
const loadedBar = document.querySelector(".loaded-bar");
const timeMessage = document.querySelector(".time");
const nextButton = document.querySelector(".next");

let hideTimeout = undefined;
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

function playVideo() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
    playButtonIcon.src = "/static/icons/play.svg";
  }
}

function fullscreen() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
    if (isMobile) screen.orientation.lock("landscape-primary");
    fullscreenButtonIcon.src = "/static/icons/exit-fullscreen.svg";
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    if (isMobile) screen.orientation.unlock();
    fullscreenButtonIcon.src = "/static/icons/fullscreen.svg";
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

let isShowingControls = true;

function showControls() {
  isShowingControls = true;
  controls.style.visibility = "visible";
  controls.style.opacity = "1";
  document.body.style.cursor = "auto";
  if (hideTimeout !== undefined) clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    hideControls();
  }, 3000)
}

function hideControls() {
  isShowingControls = false;
  controls.style.opacity = "0";
  controls.style.visibility = "hidden";
  document.body.style.cursor = "none";
}

player.addEventListener("click", () => {
  if (!isMobile) {
    playVideo();
    showControls();
  } else {
    if (isShowingControls) hideControls();
    else showControls();
  }
})
if (!isMobile) {
  player.addEventListener("mousemove", () => {
    showControls();
  });
}
player.addEventListener("mouseleave", () => {
  hideControls();
})

progressBar.addEventListener("click", (e) => {
  const percent = (e.clientX - 12) / progressBar.clientWidth;
  video.currentTime = percent * video.duration;
});

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  playedBar.style.width = `${percent}%`;
  const currentTime = parseTime(video.currentTime);
  const duration = parseTime(video.duration);
  timeMessage.innerHTML = `${currentTime}/${duration}`;
}
video.addEventListener("timeupdate", handleProgress);
video.addEventListener("canplay", handleProgress);
video.addEventListener("play", () =>
  playButtonIcon.src = "/static/icons/pause.svg")
video.addEventListener("pause", () =>
  playButtonIcon.src = "/static/icons/play.svg")

function parseTime(secs) {
  secs = Math.floor(secs);
  const h = leftpad(Math.floor(secs / (60 * 60)).toString(), 2, '0');
  secs = secs % (60 * 60);
  const m = leftpad(Math.floor(secs / 60).toString(), 2, '0');
  const s = leftpad((secs % 60).toString(), 2, '0');
  if (h !== "00") return `${h}:${m}:${s}`;
  return `${m}:${s}`;
}

function leftpad(str, len, c) {
  while (str.length < len) {
    str = c + str
  }
  return str;
}

const playbackOptions = document.querySelector(".playback-options");
const playbackButtons = document.querySelectorAll(".playback-options > button");
const playbackButton = document.querySelector(".playback");

playbackButton.addEventListener("click", () => {
  if (playbackOptions.classList.contains("hide")) {
    playbackOptions.classList.remove("hide");
  } else {
    playbackOptions.classList.add("hide");
  }
});

[...playbackButtons].forEach((button) => {
  button.addEventListener("click", () => {
    video.playbackRate = button.attributes['value'].value;
    playbackOptions.classList.add("hide");
  })
})

nextButton.addEventListener("click", () => {
  const episodes = document.querySelectorAll(".item > a");
  const title = document.querySelector(".title").innerHTML;
  const name = title.split('/').pop().split('.').slice(0, -1).join('.');

  const idx = [...episodes].findIndex((el) => el.innerText == name);
  if (idx + 1 < episodes.length) window.location.href = episodes[idx+1].href;
})
