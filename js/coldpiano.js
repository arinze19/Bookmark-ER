const spotifyLink = document.querySelector(".spotify-link");

spotifyLink.addEventListener("mouseenter", moreDetails);

function moreDetails() {
  let text = document.querySelector(".spotify-link span");
  text.classList.add("visible");
}

function nowPlaying(e) {
  let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  let key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!audio) return;

  key.classList.add("playing");
  audio.currentTime = 0;

  audio.play();
}

function stopTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

window.addEventListener("keyup", nowPlaying);

let keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("transitionend", stopTransition);
});
