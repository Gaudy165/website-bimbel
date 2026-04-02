// ─── INITIALIZATION & THEME ───
const themeToggles = document.querySelectorAll(".theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (!currentTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
} else if (currentTheme) {
  setTheme(currentTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = theme === "dark" ? "light_mode" : "dark_mode";
  themeToggles.forEach(btn => {
    const span = btn.querySelector("span");
    if (span) span.textContent = icon;
  });
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

themeToggles.forEach(btn => btn.addEventListener("click", toggleTheme));

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ─── MOBILE NAV ───
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const mobileClose = document.getElementById("mobile-close");

menuToggle.addEventListener("click", () => mobileNav.classList.add("open"));
mobileClose.addEventListener("click", () => mobileNav.classList.remove("open"));
function closeMobileNav() {
  mobileNav.classList.remove("open");
}

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
);
reveals.forEach((el) => observer.observe(el));

// ─── TESTIMONIAL SYSTEM ───
const testimonialsData = [
  {
    name: "Clarissa Amelia",
    role: "Lulus Teknik Informatika UI",
    text: "Berkat Rimberio, saya jadi jauh lebih percaya diri saat menghadapi UTBK. Materinya lengkap dan tutornya sangat bersahabat!",
    img: "img/student1.png"
  },
  {
    name: "Siti Aminah",
    role: "Juara 1 Olimpiade Matematika",
    text: "Kelasnya sangat interaktif dan seru! Tidak pernah bosan belajar di sini. Nilai raport saya naik drastis sejak bergabung.",
    img: "img/student2.png"
  },
  {
    name: "Budi Hermawan",
    role: "Lulus Kedokteran UGM",
    text: "Sangat merekomendasikan Rimberio buat teman-teman yang ingin persiapan ujian. Metodenya praktis dan langsung ke inti materi!",
    img: "img/student3.png"
  },
  {
    name: "Lina Marlina",
    role: "Lulus Akuntansi UI",
    text: "Mentornya ramah banget dan sabar kalau saya belum mudeng materi. Belajar jadi gak beban dan malah ditunggu-tunggu setiap minggunya!",
    img: "img/student4.png"
  },
  {
    name: "Rizky Pratama",
    role: "Lulus Teknik Sipil ITB",
    text: "Sangat terbantu dengan prediksi soalnya yang sering keluar di ujian beneran. Rimberio bener-bener partner terbaik buat ngejar mimpi.",
    img: "img/student5.png"
  }
];

const track = document.getElementById("testi-track");
const dotsContainer = document.getElementById("testi-dots");
let current = 0;

function renderTestimonials() {
  if (!track) return;
  
  track.innerHTML = testimonialsData.map(t => `
    <div class="testi-card">
      <div class="testi-avatar">
        <img src="${t.img}" alt="${t.name}">
      </div>
      <div class="testi-body">
        <span class="quote-mark">"</span>
        <p>${t.text}</p>
        <div>
          <strong class="testi-name">${t.name}</strong>
          <span class="testi-role">${t.role}</span>
        </div>
      </div>
    </div>
  `).join('');

  if (dotsContainer) {
    dotsContainer.innerHTML = testimonialsData.map((_, i) => `
      <div class="dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></div>
    `).join('');
  }
}

function goTo(idx) {
  const total = testimonialsData.length;
  current = (idx + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  
  const dots = document.querySelectorAll(".testi-dots .dot");
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

// Initialize Testimonials
renderTestimonials();

document.getElementById("prev-btn")?.addEventListener("click", () => goTo(current - 1));
document.getElementById("next-btn")?.addEventListener("click", () => goTo(current + 1));
dotsContainer?.addEventListener("click", (e) => {
  if (e.target.classList.contains("dot")) goTo(+e.target.dataset.idx);
});

setInterval(() => goTo(current + 1), 6000);


// ─── CUSTOM DROPDOWN ───
const dropdown = document.getElementById("paketDropdown");
const selected = document.getElementById("dropdownSelected");
const options = document.querySelectorAll(".dropdown-item");
const paketHidden = document.getElementById("paket");

let activeIndex = -1;

function openDropdown() {
  dropdown.classList.add("open");
  dropdown.setAttribute("aria-expanded", "true");
  activeIndex = 0;
  updateActiveOption();
}

function closeDropdown() {
  dropdown.classList.remove("open");
  dropdown.setAttribute("aria-expanded", "false");
  activeIndex = -1;
  options.forEach(o => o.classList.remove("active-highlight"));
}

function updateActiveOption() {
  options.forEach((opt, idx) => {
    opt.classList.toggle("active-highlight", idx === activeIndex);
    if (idx === activeIndex) {
      // Pastikan elemen yang disorot terlihat di area scroll jika ada
      opt.scrollIntoView({ block: "nearest" });
    }
  });
}

function selectOption(opt) {
  if (!opt) return;
  const val = opt.dataset.value;
  const text = opt.textContent;
  selected.querySelector("span").textContent = text;
  paketHidden.value = val;
  
  options.forEach((o) => {
    o.classList.remove("active");
    o.setAttribute("aria-selected", "false");
  });
  opt.classList.add("active");
  opt.setAttribute("aria-selected", "true");
  
  dropdown.closest(".input-group").classList.remove("error");
  closeDropdown();
  dropdown.focus();
}

selected.addEventListener("click", () => {
  if (dropdown.classList.contains("open")) {
    closeDropdown();
  } else {
    openDropdown();
  }
});

options.forEach((opt) => {
  opt.addEventListener("click", (e) => {
    e.stopPropagation();
    selectOption(opt);
  });
});

dropdown.addEventListener("keydown", (e) => {
  const isOpen = dropdown.classList.contains("open");

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (!isOpen) {
      openDropdown();
    } else {
      do {
        activeIndex = (activeIndex + 1) % options.length;
      } while (options[activeIndex].classList.contains("active"));
      updateActiveOption();
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (!isOpen) {
      openDropdown();
      activeIndex = options.length - 1;
      while (options[activeIndex].classList.contains("active")) {
        activeIndex = (activeIndex - 1 + options.length) % options.length;
      }
      updateActiveOption();
    } else {
      do {
        activeIndex = (activeIndex - 1 + options.length) % options.length;
      } while (options[activeIndex].classList.contains("active"));
      updateActiveOption();
    }
  } else if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (!isOpen) {
      openDropdown();
    } else {
      selectOption(options[activeIndex]);
    }
  } else if (e.key === "Escape") {
    if (isOpen) {
      e.preventDefault();
      closeDropdown();
    }
  } else if (e.key === "Tab") {
    if (isOpen) closeDropdown();
  }
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) closeDropdown();
});

// ─── FORM VALIDATION ───
function validasi(e) {
  e.preventDefault();
  let valid = true;

  function check(id, condition) {
    const el = document.getElementById(id);
    const group = el.closest(".input-group");
    if (!condition(el.value)) {
      group.classList.add("error");
      valid = false;
    } else group.classList.remove("error");
    el.addEventListener("input", () => {
      if (condition(el.value)) group.classList.remove("error");
    });
  }

  check("nama", (v) => v.trim().length >= 2);
  check("password", (v) => v.length >= 6);
  check("email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  check("telpon", (v) => v.trim().length >= 8);
  check("alamat", (v) => v.trim().length >= 5);

  // Paket check
  const paketGroup = document
    .getElementById("paketDropdown")
    .closest(".input-group");
  if (!paketHidden.value) {
    paketGroup.classList.add("error");
    valid = false;
  } else {
    paketGroup.classList.remove("error");
  }

  if (valid) {
    showToast("check_circle", "Pendaftaran berhasil dikirim!");
    document.getElementById("formPendaftaran").reset();
    selected.querySelector("span").textContent = "Pilih paket belajar";
    paketHidden.value = "";
    options.forEach((o) => o.classList.remove("active"));
  }
  return false;
}

// ─── TOAST ───
function showToast(icon, message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span class="material-symbols-rounded">${icon}</span>${message}`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3500);
}

// ─── BACK TO TOP ───
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ─── GLOBAL IMAGE ERROR HANDLER ───
window.addEventListener("error", (e) => {
  if (e?.target?.tagName === "IMG") {
    const parent = e.target.parentElement;
    if (parent && parent.classList.contains("testi-avatar")) {
      const initial = e.target.alt ? e.target.alt.charAt(0) : "?";
      parent.innerHTML = `<div class='testi-avatar-placeholder'>${initial}</div>`;
    }
  }
}, true);
