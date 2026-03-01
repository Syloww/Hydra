document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  // Parallax au scroll
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length) {
    let ticking = false;
    function updateParallax() {
      const scrollY = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
        const rect = el.closest(".hero, .section")?.getBoundingClientRect();
        const sectionTop = rect ? rect.top + scrollY : 0;
        const sectionHeight = el.closest(".hero, .section")?.offsetHeight || document.documentElement.scrollHeight;
        const maxScroll = sectionTop + sectionHeight;
        const cappedScroll = Math.max(0, Math.min(scrollY, maxScroll));
        const offset = cappedScroll * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax();
  }

  // Scroll fluide amélioré pour les anciens navigateurs
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        const yOffset = -70;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth"
        });
      }
    });
  });
});

