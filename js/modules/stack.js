export function initStack() {
  const track = document.getElementById("stack");

  if (!track) return;

  track.innerHTML += track.innerHTML;
}
