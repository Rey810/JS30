// add a keypress listener to the document
document.addEventListener("keydown", playSound);

// get all the drumkit keys
const keys = document.querySelectorAll(".key");

// removes transition
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

// removes playing effect when the CSS transition has ended
function removeTransition(e) {
  // skip it if it's not a transform
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function playSound(e) {
  // get key
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  // exits if a non-drum key was pressed
  if (!key) return;
  addEffect(key, audio);
}

// add css effects to pressed key and restart sound
function addEffect(currKey, audio) {
  currKey.classList.add("playing");
  // rewinds audio to start
  audio.currentTime = 0;
  audio.play();
}
