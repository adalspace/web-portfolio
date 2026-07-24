import "./styles.css";

const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const header = document.querySelector("[data-header]");
const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");

const closeMenu = () => {
  menuButton?.setAttribute("aria-expanded", "false");
  mobileNav?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuButton?.addEventListener("click", () => {
  const nextOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(nextOpen));
  mobileNav?.classList.toggle("is-open", nextOpen);
  document.body.classList.toggle("menu-open", nextOpen);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = lightbox?.querySelector("[data-lightbox-image]");
const lightboxCaption = lightbox?.querySelector("[data-lightbox-caption]");
const lightboxClose = lightbox?.querySelector("[data-lightbox-close]");
let lightboxTrigger = null;

const closeLightbox = () => {
  if (!lightbox?.open) return;
  lightbox.close();
};

document.querySelectorAll("[data-lightbox-trigger], [data-lightbox-src]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    const previewImage = trigger.querySelector("img");
    const resolvedSource =
      previewImage?.currentSrc ||
      previewImage?.src ||
      trigger.dataset.lightboxSrc ||
      "";

    if (!resolvedSource) return;

    lightboxTrigger = trigger;
    lightboxImage.src = resolvedSource;
    lightboxImage.alt = previewImage?.alt || trigger.dataset.lightboxAlt || "Project screenshot";
    lightboxCaption.textContent = trigger.dataset.lightboxCaption ?? "";
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightbox?.addEventListener("close", () => {
  if (lightboxImage) lightboxImage.src = "";
  lightboxTrigger?.focus();
  lightboxTrigger = null;
});
