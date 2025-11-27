/* script.js */
// NAVBAR interactivity (append to script.js)

/* Mobile toggle */
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    const open = mobileMenu.getAttribute("aria-hidden") === "true" || !mobileMenu.style.display || mobileMenu.style.display === "none";
    if (open) {
      mobileMenu.style.display = "block";
      mobileMenu.setAttribute("aria-hidden", "false");
      navToggle.classList.add("open");
    } else {
      mobileMenu.style.display = "none";
      mobileMenu.setAttribute("aria-hidden", "true");
      navToggle.classList.remove("open");
    }
  });
}

/* Keep active state in sync between desktop & mobile menus */
function syncActiveLinks(selector = ".nav-menu a") {
  const desktopLinks = Array.from(document.querySelectorAll(".nav-menu a"));
  const mobileLinks = Array.from(document.querySelectorAll(".mobile-menu a"));

  function setActive(index) {
    desktopLinks.forEach((a, i) => a.classList.toggle("active", i === index));
    mobileLinks.forEach((a, i) => a.classList.toggle("active", i === index));
  }

  desktopLinks.forEach((a, i) => {
    a.addEventListener("click", (e) => {
      // allow navigation but also set active
      setActive(i);
    });
  });
  mobileLinks.forEach((a, i) => {
    a.addEventListener("click", (e) => {
      setActive(i);
      // collapse mobile menu after selection
      if (mobileMenu) mobileMenu.style.display = "none";
    });
  });
}
document.addEventListener("DOMContentLoaded", () => syncActiveLinks());

/* Optional: set the logo link programmatically if you want to inject from code */
const logoLink = document.getElementById("logoLink");
// Example: logoLink.href = "https://your-site.example"; // <-- set your link here if you prefer

/* -----------------------------
   SERVICES DATA → AUTO RENDER
------------------------------*/
const services = [
  {
    price: "$65",
    category: "Therapy",
    title: "Full Body Ayurveda Massage",
    description:
      "A traditional warm oil therapy that nourishes muscles, improves circulation, and restores balance.",
    duration: "60 min",
    level: "Beginner Friendly",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900",
    icon: "🧘‍♀️"
  },
  {
    price: "$40",
    category: "Yoga",
    title: "Deep Stretch Yoga Class",
    description:
      "A gentle class focused on improving flexibility, calming the mind, and relieving stress.",
    duration: "45 min",
    level: "All Levels",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=900",
    icon: "🌿"
  },
  {
    price: "$55",
    category: "Spa Ritual",
    title: "Shirodhara Oil Treatment",
    description:
      "A warm oil stream poured gently on the forehead to promote deep relaxation and clarity.",
    duration: "40 min",
    level: "Calming",
    image: "https://images.unsplash.com/photo-1556228780-65d8d66dfbc0?w=900",
    icon: "💧"
  },
  {
    price: "$75",
    category: "Healing",
    title: "Hot Stone Therapy",
    description:
      "Warm stones melt tension and help relieve chronic pain, inflammation, and stress.",
    duration: "70 min",
    level: "Therapeutic",
    image: "https://images.unsplash.com/photo-1556228453-efdca89f3f54?w=900",
    icon: "🔥"
  }
];

function renderServices() {
  const container = document.getElementById("servicesContainer");
  if (!container) return;

  container.innerHTML = services
    .map(
      (s) => `
      <div class="service-card">
        <div class="service-media">
          <img src="${s.image}" alt="${s.title}">
          <div class="overlay"></div>
          <span class="price-badge">${s.price}</span>
          <div class="icon-box">${s.icon}</div>
        </div>
        <div class="service-content">
          <span class="service-sub">${s.category}</span>
          <h3 class="service-title">${s.title}</h3>
          <p class="service-desc">${s.description}</p>

          <div class="service-meta">
            <span>⏱ ${s.duration}</span>
            <span>⭐ ${s.level}</span>
          </div>

          <button class="service-cta">Book Appointment →</button>
        </div>
      </div>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", renderServices);

/* -----------------------------
     TESTIMONIAL SLIDER
------------------------------*/
const testimonials = [
  {
    text:
      "Yoga Synergy has changed my life — the classes are calming, grounding, and incredibly healing. Highly recommended!",
    name: "Maya Thompson",
    role: "Yoga Student"
  },
  {
    text:
      "The Ayurveda massage was the most relaxing treatment I’ve ever experienced. My back pain improved instantly.",
    name: "Daniel Reed",
    role: "Wellness Client"
  },
  {
    text:
      "The instructors are truly gifted. Every session feels personalized and deeply restorative.",
    name: "Sophia Rahman",
    role: "Regular Member"
  }
];

let currentIndex = 0;
let autoPlay;

/* assign DOM */
const testimonialText = document.getElementById("testimonialText");
const testimonialName = document.getElementById("testimonialName");
const testimonialRole = document.getElementById("testimonialRole");
const dotsContainer = document.getElementById("testimonialDots");

function renderDots() {
  dotsContainer.innerHTML = testimonials
    .map(
      (_, i) =>
        `<button class="${i === 0 ? "active" : ""}" data-index="${i}"></button>`
    )
    .join("");

  // Add click events
  [...dotsContainer.children].forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index, 10);
      goToSlide(index);
      restartAutoPlay();
    });
  });
}

function updateSlide() {
  testimonialText.textContent = testimonials[currentIndex].text;
  testimonialName.textContent = testimonials[currentIndex].name;
  testimonialRole.textContent = testimonials[currentIndex].role;

  [...dotsContainer.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateSlide();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateSlide();
}

function startAutoPlay() {
  autoPlay = setInterval(nextSlide, 5000);
}

function restartAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}

document.addEventListener("DOMContentLoaded", () => {
  renderDots();
  updateSlide();
  startAutoPlay();
});
