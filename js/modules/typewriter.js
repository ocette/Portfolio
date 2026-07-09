export function initTypewriter() {
  const elGreeting = document.getElementById("twGreeting");
  const elRole = document.getElementById("twRole");

  if (!elGreeting || !elRole) return;

  const roles = [
    "graphiste.",
    "ux ui designer.",
    "dev frontend.",
    "curieuse.",
    "gourmande.",
  ];

  const SPEED_TYPE = 55;
  const SPEED_DELETE = 30;
  const PAUSE_AFTER = 1800;
  const PAUSE_START = 400;

  const title = document.querySelector(".hero-title");
  if (title) title.style.opacity = "1";

  function typeText(el, text, speed) {
    return new Promise((resolve) => {
      let i = 0;

      function next() {
        if (i < text.length) {
          el.textContent += text[i++];
          setTimeout(next, speed + Math.random() * 25);
        } else {
          resolve();
        }
      }

      next();
    });
  }

  function deleteText(el, speed) {
    return new Promise((resolve) => {
      function next() {
        const t = el.textContent;

        if (t.length > 0) {
          el.textContent = t.slice(0, -1);
          setTimeout(next, speed);
        } else {
          resolve();
        }
      }

      next();
    });
  }

  function pause(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function run() {
    await pause(300);

    elGreeting.style.transition = "opacity 0.8s ease";
    elGreeting.style.opacity = "1";

    await pause(900);

    ["hero-sub", "hero-socials", "hero-cta"].forEach((cls, i) => {
      const el = document.querySelector("." + cls);

      if (el) {
        setTimeout(() => {
          el.style.opacity = "1";
        }, i * 180);
      }
    });

    await pause(700);

    let roleIndex = 0;

    while (true) {
      await typeText(elRole, roles[roleIndex], SPEED_TYPE);

      await pause(PAUSE_AFTER);

      await deleteText(elRole, SPEED_DELETE);

      await pause(PAUSE_START);

      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  run();
}
