// Spinner-ka
window.addEventListener("load", () => {
  const spinner = document.getElementById("spinner");
  if (spinner) spinner.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect-igiisa
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  // Tabs active effect-igiisa
  const navTabs = document.getElementById("navTabs");
  const allLinks = document.querySelectorAll("#navTabs a");

  if (navTabs) {
    navTabs.addEventListener("click", (e) => {
      const target = e.target;
      if (target.tagName === "A") {
        // Remove active from all list items
        navTabs
          .querySelectorAll("li")
          .forEach((li) => li.classList.remove("active"));

        // Add active to parent li
        const parentLi = target.closest("li");
        if (parentLi) {
          parentLi.classList.add("active");
        }

        // Ku dar scrolled class-ka navbar-ka
        if (navbar && !navbar.classList.contains("scrolled")) {
          navbar.classList.add("scrolled");
        }
      }
    });
  }

  // Dropdown menu-ka
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();

      const parent = this.parentElement;
      parent?.classList.toggle("open");

      // Xir dropdowns-ka kale
      document.querySelectorAll(".dropdown").forEach((drop) => {
        if (drop !== parent) drop.classList.remove("open");
      });
    });
  });

  // Xir dropdown-ka hadii lataabtoo outside-ka
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".dropdown").forEach((drop) => {
      if (!drop.contains(e.target)) {
        drop.classList.remove("open");
      }
    });
  });

  // Mobile nav-ka
  const navToggle = document.getElementById("navToggle");
  const navTabsWrap = document.querySelector(".nav-tabs-wrap");
  if (navToggle && navTabsWrap) {
    navToggle.addEventListener("click", () => {
      navTabsWrap.classList.toggle("show");
    });
  }

  // Carousel-ka
  let currentIndex = 0;
  const slides = document.querySelectorAll(".carousel-slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);

      const caption = slide.querySelector(".carousel-caption");
      if (caption) {
        caption.classList.remove("hero-animate-left", "hero-animate-right");

        void caption.offsetWidth;

        if (slide.dataset.direction === "right") {
          caption.classList.add("hero-animate-right");
        } else {
          caption.classList.add("hero-animate-left");
        }
      }
    });
  }

  function changeSlide(dir) {
    currentIndex = (currentIndex + dir + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  if (prevBtn) prevBtn.onclick = () => changeSlide(-1);
  if (nextBtn) nextBtn.onclick = () => changeSlide(1);

  setInterval(() => {
    changeSlide(1);
  }, 8000);

  showSlide(currentIndex);
});

// Testimonials-ka
const testimonials = [
  {
    img: "assets/img/testimonial-1.jpg",
    name: "Client Name",
    profession: "Profession",
    stars: 5,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt pariatur officiis quis molestias, sit iure sunt voluptatibus accusantium laboriosam dolore.",
  },
  {
    img: "assets/img/testimonial-2.jpg",
    name: "Client Name",
    profession: "Profession",
    stars: 5,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt pariatur officiis quis molestias, sit iure sunt voluptatibus accusantium laboriosam dolore.",
  },
  {
    img: "assets/img/testimonial-3.jpg",
    name: "Client Name",
    profession: "Profession",
    stars: 5,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt pariatur officiis quis molestias, sit iure sunt voluptatibus accusantium laboriosam dolore.",
  },
  {
    img: "assets/img/testimonial-4.jpg",
    name: "Client Name",
    profession: "Profession",
    stars: 5,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt pariatur officiis quis molestias, sit iure sunt voluptatibus accusantium laboriosam dolore.",
  },
];

const slidesPerView = 2;
let currentIndex = 0;
let timer;
const track = document.getElementById("testimonialTrack");
const indicators = document.getElementById("testimonialIndicators");
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");

function renderSlides(index) {
  track.style.opacity = 0.5;
  setTimeout(() => {
    track.innerHTML = "";
    for (let i = 0; i < slidesPerView; i++) {
      let tIndex = (index + i) % testimonials.length;
      let t = testimonials[tIndex];

      // Create slide element in the requested order
      let slide = document.createElement("div");
      slide.className = "testimonial-slide";
      slide.innerHTML = `
      <p>${t.text}</p>
      <img class="testimonial-img" src="${t.img}" alt="Testimonial ${
        tIndex + 1
      }">
      <h4>${t.name}</h4>
      <p>${t.profession}</p>
      <div class="testimonial-stars">
        ${'<i class="fas fa-star"></i>'.repeat(t.stars)}
      </div>
    `;
      track.appendChild(slide);
    }
    track.style.opacity = 1;
  }, 300);
}

function renderIndicators() {
  indicators.innerHTML = "";
  let total = Math.ceil(testimonials.length / slidesPerView);
  for (let i = 0; i < total; i++) {
    let dot = document.createElement("div");
    dot.className =
      "testimonial-indicator" +
      (i === Math.floor(currentIndex / slidesPerView) ? " active" : "");
    dot.onclick = () => {
      currentIndex = i * slidesPerView;
      updateCarousel();
    };
    indicators.appendChild(dot);
  }
}

function updateCarousel() {
  renderSlides(currentIndex);
  renderIndicators();
  resetTimer();
}

function prevSlide() {
  currentIndex =
    (currentIndex - slidesPerView + testimonials.length) % testimonials.length;
  updateCarousel();
}
function nextSlide() {
  currentIndex = (currentIndex + slidesPerView) % testimonials.length;
  updateCarousel();
}
function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => nextSlide(), 8000);
}

prevBtn.onclick = prevSlide;
nextBtn.onclick = nextSlide;

window.addEventListener("DOMContentLoaded", () => {
  updateCarousel();
  setTimeout(() => nextSlide(), 1000);
});

// Show button-ka scroll-ka
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
