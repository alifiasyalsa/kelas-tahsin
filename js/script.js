const navDropdown = document.getElementById("navDropdown");
const menuBtn = document.getElementById("menuBtn");
const appWrapper = document.getElementById("app-wrapper");

function openMenu() {
  navDropdown.classList.add("open");
  menuBtn.classList.add("active");
  updateActiveMenuItem();
  appWrapper.style.paddingTop = (53 + navDropdown.scrollHeight) + "px";
}
function closeMenu() {
  navDropdown.classList.remove("open");
  menuBtn.classList.remove("active");
  appWrapper.style.paddingTop = "53px";
}
menuBtn.addEventListener("click", () =>
  navDropdown.classList.contains("open") ? closeMenu() : openMenu(),
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

function navTo(id) {
  closeMenu();
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const navbar = document.querySelector("nav");
    const offset = navbar ? navbar.offsetHeight : 53;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  }, 300);
}

function updateActiveMenuItem() {
  const sections = [
    { id: "sec-hero", idx: 0 },
    { id: "sec-mengapa", idx: 1 },
    { id: "sec-waktu", idx: 2 },
    { id: "sec-pengajar", idx: 3 },
    { id: "sec-testimoni", idx: 4 },
    { id: "sec-gallery", idx: 5 },
    { id: "sec-faq", idx: 6 },
  ];
  const scrollY = window.scrollY + 80;
  let active = 0;
  sections.forEach((s) => {
    const el = document.getElementById(s.id);
    if (el && el.offsetTop <= scrollY) active = s.idx;
  });
  document
    .querySelectorAll(".menu-item")
    .forEach((item, i) =>
      item.classList.toggle("menu-item-active", i === active),
    );
}
window.addEventListener("scroll", updateActiveMenuItem);

function toggleAcc(id) {
  const body = document.getElementById("body-" + id);
  const chev = document.getElementById("chev-" + id);
  const isOpen = body.classList.contains("open");
  document
    .querySelectorAll(".accordion-body")
    .forEach((b) => b.classList.remove("open"));
  document
    .querySelectorAll(".chevron")
    .forEach((c) => c.classList.remove("open"));
  if (!isOpen) {
    body.classList.add("open");
    chev.classList.add("open");
  }
}

function toggleFaq(header) {
  const body = header.nextElementSibling;
  const chev = header.querySelector(".faq-chevron");
  const isOpen = body.classList.contains("open");
  document
    .querySelectorAll(".faq-body")
    .forEach((b) => b.classList.remove("open"));
  document
    .querySelectorAll(".faq-chevron")
    .forEach((c) => c.classList.remove("open"));
  if (!isOpen) {
    body.classList.add("open");
    chev.classList.add("open");
  }
}

let teacherCurrentIndex = 0;
const teacherCardWidth = 165 + 14; // width + gap
const teacherTotalCards = 3; // sesuaikan jumlah kartu

function stepTeacher(dir) {
  const maxIndex = teacherTotalCards - 1;
  teacherCurrentIndex = Math.max(0, Math.min(teacherCurrentIndex + dir, maxIndex));
  scrollTeacher(teacherCurrentIndex);
  updateTeacherArrows();
}

function updateTeacherArrows() {
  const prev = document.getElementById("teacherPrev");
  const next = document.getElementById("teacherNext");
  if (prev) prev.style.opacity = teacherCurrentIndex === 0 ? "0.3" : "1";
  if (next) next.style.opacity = teacherCurrentIndex === teacherTotalCards - 1 ? "0.3" : "1";
}

function scrollTeacher(index) {
  teacherCurrentIndex = index;
  const scroll = document.getElementById("teacherScroll");
  scroll.scrollTo({ left: index * teacherCardWidth, behavior: "smooth" });
  document.querySelectorAll(".cdot").forEach((d, i) => {
    const isActive = i === index;
    d.style.width = isActive ? "18px" : "6px";
    d.style.borderRadius = isActive ? "4px" : "50%";
    d.style.background = isActive ? "#BB8F63" : "#CED2DE";
  });
  updateTeacherArrows();
}

teacherScroll.addEventListener("scroll", () => {
  const idx = Math.round(teacherScroll.scrollLeft / teacherCardWidth);
  teacherCurrentIndex = idx;
  document.querySelectorAll(".cdot").forEach((d, i) => {
    const isActive = i === idx;
    d.style.width = isActive ? "18px" : "6px";
    d.style.borderRadius = isActive ? "4px" : "50%";
    d.style.background = isActive ? "#BB8F63" : "#CED2DE";
  });
  updateTeacherArrows();
});

updateTeacherArrows();


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

document.querySelectorAll(".stagger").forEach((parent) => {
  [...parent.children].forEach((child, i) => {
    child.style.transitionDelay = i * 0.07 + "s";
  });
});

setTimeout(() => {
  document.querySelectorAll(".fade-up").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add("visible");
  });
}, 100);

// Banner Slider functionality
let bannerCurrentSlide = 0;
const bannerTotalSlides = 4;
const bannerSlides = document.getElementById("banner-slides");
const bannerDots = document.querySelectorAll(".banner-dot");

function updateBannerSlider() {
  if (bannerSlides) {
    bannerSlides.style.transform = `translateX(-${bannerCurrentSlide * 100}%)`;
  }

  bannerDots.forEach((dot, index) => {
    if (index === bannerCurrentSlide) {
      dot.style.width = "18px";
      dot.style.borderRadius = "4px";
      dot.style.background = "#BB8F63";
    } else {
      dot.style.width = "6px";
      dot.style.borderRadius = "50%";
      dot.style.background = "#CED2DE";
    }
  });
}

function nextBannerSlide() {
  bannerCurrentSlide = (bannerCurrentSlide + 1) % bannerTotalSlides;
  updateBannerSlider();
}

function goToBannerSlide(slideIndex) {
  bannerCurrentSlide = slideIndex;
  updateBannerSlider();
}

if (bannerDots) {
  bannerDots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToBannerSlide(index));
  });
}

updateBannerSlider();

let bannerInterval = setInterval(nextBannerSlide, 4000);

const bannerSlider = document.querySelector(".banner-slider");
if (bannerSlider) {
  bannerSlider.addEventListener("mouseenter", () => {
    clearInterval(bannerInterval);
  });

  bannerSlider.addEventListener("mouseleave", () => {
    bannerInterval = setInterval(nextBannerSlide, 4000);
  });
}

// Countdown Timer functionality
function calculateCountdown() {
  // Target date: May 2, 2026, 00:00:00
  const targetDate = new Date(2026, 4, 2, 0, 0, 0);
  
  // Current time
  const now = new Date();
  
  // Calculate difference in milliseconds
  const timeDifference = targetDate - now;
  
  if (timeDifference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  // Convert to days, hours, minutes, seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

function updateCountdown() {
  const countdown = calculateCountdown();
  
  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");
  
  if (daysEl) daysEl.textContent = countdown.days;
  if (hoursEl) hoursEl.textContent = padZero(countdown.hours);
  if (minutesEl) minutesEl.textContent = padZero(countdown.minutes);
  if (secondsEl) secondsEl.textContent = padZero(countdown.seconds);
}

function initCountdown() {
  // Update immediately
  updateCountdown();
  
  // Update every second
  setInterval(updateCountdown, 1000);
}

// Initialize countdown on page load
document.addEventListener("DOMContentLoaded", initCountdown);
// Also initialize immediately in case DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCountdown);
} else {
  initCountdown();
}