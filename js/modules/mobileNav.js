export function initMobileNav() {
  const burger = document.getElementById("navBurger");
  const drawer = document.getElementById("navDrawer");
  const overlay = document.getElementById("navOverlay");

  if (!burger || !drawer || !overlay) {
    console.error("Un des éléments du menu mobile est introuvable.");
    return;
  }

  function toggleMenu() {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    burger.classList.add("open");
    drawer.classList.add("open");
    overlay.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    burger.classList.remove("open");
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}
