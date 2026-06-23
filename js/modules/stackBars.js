export function initStackBars() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const bar = entry.target.querySelector(".stack-bar-fill");

        if (bar) {
          const width = parseFloat(bar.dataset.width) || 1;
          bar.style.transform = `scaleX(${width})`;
        }

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 },
  );

  document
    .querySelectorAll(".stack-item")
    .forEach((el) => observer.observe(el));
}
