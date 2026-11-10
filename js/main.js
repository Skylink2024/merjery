(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const isHome = document.body.classList.contains("home");

  const setHeaderSolid = (solid) => {
    if (!header || !isHome) return;
    header.classList.toggle("is-solid", solid);
  };

  const syncHeader = () => {
    const menuOpen = mobileNav?.classList.contains("open");
    setHeaderSolid(window.scrollY > 24 || !!menuOpen);
  };

  if (header && isHome) {
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      syncHeader();
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        syncHeader();
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  const form = document.querySelector("#booking-form");
  if (!form) return;

  const WA = "27740525790";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "").trim();
    const date = String(data.get("date") || "").trim();
    const time = String(data.get("time") || "").trim();
    const notes = String(data.get("notes") || "").trim();

    if (!name || !phone || !service) {
      form.reportValidity();
      return;
    }

    const lines = [
      "Hi Merjery Beauty — I'd like to book an appointment.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      date ? `Preferred date: ${date}` : null,
      time ? `Preferred time: ${time}` : null,
      notes ? `Notes: ${notes}` : null,
    ].filter(Boolean);

    const url = `https://wa.me/${WA}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });
})();
