export function initMascot() {
  const frames = Array.from(document.querySelectorAll(".mascot-frame"));
  const delays = [670, 670, 670, 670, 670, 670, 670, 670, 670, 670, 500, 170];
  if (!frames.length) return;

  let current = 0;
  let playing = true;
  let timer = null;

  function showFrame(n) {
    frames.forEach((f) => f.classList.remove("active"));
    frames[n].classList.add("active");
  }

  function scheduleNext() {
    if (!playing) return;
    timer = setTimeout(() => {
      current = (current + 1) % frames.length;
      showFrame(current);
      scheduleNext();
    }, delays[current]);
  }

  function togglePlay() {
    playing = !playing;
    if (playing) scheduleNext();
    else clearTimeout(timer);
  }

  // Clic sur la mascotte = pause/play
  const circle = document.getElementById("mascotCircle");
  if (circle) circle.addEventListener("click", togglePlay);

  // Init
  showFrame(0);
  scheduleNext();
}
