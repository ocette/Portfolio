export function initActiveNav() {
  const sections = document.querySelectorAll("section[id], div[id]");
  const links = document.querySelectorAll(".nav-links a");

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`,
          );
        });
      });
    },
    {
      rootMargin: "-40% 0px -40% 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));
}
