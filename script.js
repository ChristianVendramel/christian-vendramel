/**
 * Portfolio Website - JavaScript
 * Author: Frontend Developer Christian Vendramel
 * Description: Main JavaScript file for portfolio interactions
 */

// ===============================
// Navigation Scroll Effect
// ===============================
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("mainNav")

  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 15, 0.98)"
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5)"
  } else {
    navbar.style.background = "rgba(10, 10, 15, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// ===============================
// Active Navigation Link
// ===============================
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// ===============================
// Smooth Scroll for Navigation Links
// ===============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })

      // Close mobile menu after click
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        const navbarToggler = document.querySelector(".navbar-toggler")
        navbarToggler.click()
      }
    }
  })
})

// ===============================
// Back to Top Button
// ===============================
const backToTopButton = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show")
  } else {
    backToTopButton.classList.remove("show")
  }
})

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ===============================
// Project Cards - Open Project on Eye Click
// Mantém HTML e visual exatamente como estão
// ===============================

document.querySelectorAll(".project-card").forEach((card) => {
  const button = card.querySelector(".btn-cyber-sm")

  if (button) {
    // Garante que o botão não tenha comportamento inesperado
    button.setAttribute("type", "button")

    button.addEventListener("click", (e) => {
      e.stopPropagation() // evita conflitos com outros cliques

      const url = card.getAttribute("data-url")

      if (url) {
        window.open(url, "_blank", "noopener,noreferrer")
      } else {
        console.warn("Projeto sem URL definida:", card)
      }
    })
  }
})

// ===============================
// Scroll Animation for Elements
// ===============================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease forwards"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe skill cards, process cards, and project cards
document.querySelectorAll(".skill-card, .process-card, .project-card").forEach((element) => {
  element.style.opacity = "0"
  observer.observe(element)
})

// ===============================
// Performance: Lazy Loading Images
// ===============================
if ("loading" in HTMLImageElement.prototype) {
  // Browser supports lazy loading natively
  const images = document.querySelectorAll('img[loading="lazy"]')
  images.forEach((img) => {
    img.src = img.dataset.src
  })
} else {
  // Fallback for browsers that don't support lazy loading
  const images = document.querySelectorAll("img")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
        }
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// ===== Coffee Scroll Effect =====

const coffeeDrop = document.querySelector(".coffee-drop");
const coffeeFill = document.querySelector(".coffee-fill");

function updateCoffeeScroll() {
  const scrollTop = window.scrollY;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = Math.min(scrollTop / maxScroll, 1);

  coffeeDrop.style.height = progress * 100 + "%";
  coffeeFill.style.height = progress * 100 + "%";
}

window.addEventListener("scroll", updateCoffeeScroll);
window.addEventListener("load", updateCoffeeScroll);

// ===============================
// Accessibility: Focus Management
// ===============================
document.addEventListener("keydown", (e) => {
  // Allow keyboard navigation
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// ===============================
// Console Message
// ===============================
console.log("%cHello hacker 😎 hahahaa", "color:#17d165; font-size:18px; font-weight:bold;");
console.log("%cChristian Vendramel Rebolo – Frontend Developer", "color:#00f0ff; font-size:16px; font-weight:bold;");
console.log("%cHTML • CSS • JavaScript • Bootstrap • UI/UX", "color:#f50202;");
console.log("%cPortfólio desenvolvido com foco em performance, acessibilidade e boas práticas.", "color:#b829fc;");

