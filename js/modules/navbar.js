export function initNavScroll() {
  const nav = document.querySelector("nav");

  if (!nav) return;

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("nav-scrolled", window.scrollY > 60);
    },
    { passive: true },
  );
}
