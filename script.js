/* ── Typewriter hero ── */
(function initTypewriter() {
  const elGreeting = document.getElementById("twGreeting");
  const elRole = document.getElementById("twRole");

  if (!elGreeting || !elRole) return;

  // Rôles à taper en boucle
  const roles = [
    "graphiste.",
    "ux ui designer.",
    "dev fullstack.",
    "curieuse.",
    "gourmande.",
  ];

  const SPEED_TYPE = 55; // ms par lettre en frappe
  const SPEED_DELETE = 30; // ms par lettre en effacement
  const PAUSE_AFTER = 1800; // pause après avoir fini de taper un rôle
  const PAUSE_START = 400; // pause avant de commencer le prochain

  // Rendre le titre visible immédiatement (on gère l'animation via JS)
  const title = document.querySelector(".hero-title");
  if (title) title.style.opacity = "1";

  // Typer une chaîne lettre par lettre dans un élément
  function typeText(el, text, speed) {
    return new Promise((resolve) => {
      let i = 0;
      function next() {
        if (i < text.length) {
          el.textContent += text[i++];
          setTimeout(next, speed + Math.random() * 25); // légère irrégularité
        } else {
          resolve();
        }
      }
      next();
    });
  }

  // Effacer une chaîne lettre par lettre
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
    // 1. Fondu "Bonjour, je suis Océane Thauvin."
    await pause(300);
    elGreeting.style.transition = "opacity 0.8s ease";
    elGreeting.style.opacity = "1";
    await pause(900);

    // 3. Révéler les éléments sous le titre
    ["hero-sub", "hero-socials", "hero-cta"].forEach((cls, i) => {
      const el = document.querySelector("." + cls);
      if (el)
        setTimeout(() => {
          el.style.opacity = "1";
        }, i * 180);
    });
    await pause(700);

    // 4. Boucle typewriter sur les rôles
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
})();

/* ── Scroll reveal ── */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  document
    .querySelectorAll(".reveal, .reveal-left")
    .forEach((el) => observer.observe(el));
})();

/* ── Stack bars ── */
(function initStackBars() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector(".stack-bar-fill");
          if (bar) {
            const w = parseFloat(bar.dataset.width) || 1;
            bar.style.transform = `scaleX(${w})`;
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  document
    .querySelectorAll(".stack-item")
    .forEach((el) => observer.observe(el));
})();

/* ── Nav background on scroll ── */
(function initNavScroll() {
  const nav = document.querySelector("nav");
  if (!nav) return;
  window.addEventListener(
    "scroll",
    () => {
      nav.style.background =
        window.scrollY > 60 ? "rgba(26,16,37,0.95)" : "rgba(26,16,37,0.6)";
    },
    { passive: true },
  );
})();

/* ── Active nav link ── */
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id], div[id]");
  const links = document.querySelectorAll(".nav-links a");
  if (!sections.length || !links.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { rootMargin: "-40% 0px -40% 0px" },
  );
  sections.forEach((s) => observer.observe(s));
})();

/* ── Stack duplicate ── */
(function initStack() {
  const track = document.getElementById("stack");
  if (track) track.innerHTML += track.innerHTML;
})();

/* ── Mascotte animée ── */
(function initMascot() {
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
})();

/* ── Easter egg : clic sur le citron ── */
(function initEasterEgg() {
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
    // Toggle aussi la mascotte
    const circle = document.getElementById("mascotCircle");
    if (circle) circle.click();
  });
})();

/* ── Konami code easter egg ── */
(function initKonami() {
  const code = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  const toast = document.getElementById("easterToast");
  let progress = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === code[progress]) {
      progress++;
      if (progress === code.length) {
        progress = 0;
        if (toast) {
          toast.textContent =
            "🍋 KONAMI ! Tu maîtrises déjà les raccourcis clavier — bon signe pour une dev !";
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 5000);
        }
      }
    } else {
      progress = 0;
    }
  });
})();

(function initStackPills() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // ✅ Cible le conteneur du marquee
          const items = entry.target.querySelectorAll(".stack-item");
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, index * 80);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  const wrap = document.getElementById("stackWrap");
  if (wrap) observer.observe(wrap);
})();

/* ── Menu hamburger mobile ── */
(function initMobileNav() {
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

  // Fermer le menu si on clique sur un lien
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
})();
