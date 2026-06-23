// modules/stackPills.js

export function initStackPills() {
  const wrap = document.getElementById("stackWrap");

  if (!wrap) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;

      entry.target.querySelectorAll(".stack-item").forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 80);
      });

      observer.unobserve(entry.target);
    },
    {
      threshold: 0.3,
    },
  );

  observer.observe(wrap);
}
