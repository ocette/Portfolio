export function initEasterEgg() {
  const lemon = document.getElementById("lemonEgg");
  const toast = document.getElementById("easterToast");

  if (!lemon || !toast) return;

  lemon.addEventListener("click", () => {
    toast.classList.add("show");

    lemon.style.transform = "rotate(360deg) scale(1.5)";

    setTimeout(() => {
      lemon.style.transform = "";
    }, 600);

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);

    document.getElementById("mascotCircle")?.click();
  });
}
