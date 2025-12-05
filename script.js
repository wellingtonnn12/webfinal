// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")
const html = document.documentElement

// Check for saved dark mode preference or system preference
function initializeDarkMode() {
  const savedMode = localStorage.getItem("darkMode")

  if (savedMode === "enabled") {
    enableDarkMode()
  } else if (savedMode === "disabled") {
    disableDarkMode()
  } else {
    // Use system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      enableDarkMode()
    } else {
      disableDarkMode()
    }
  }
}

function enableDarkMode() {
  html.classList.add("dark-mode")
  html.classList.remove("light-mode")
  darkModeToggle.textContent = "☀️"
  localStorage.setItem("darkMode", "enabled")
}

function disableDarkMode() {
  html.classList.add("light-mode")
  html.classList.remove("dark-mode")
  darkModeToggle.textContent = "🌙"
  localStorage.setItem("darkMode", "disabled")
}

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
  if (html.classList.contains("dark-mode")) {
    disableDarkMode()
  } else {
    enableDarkMode()
  }
})

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close menu when clicking a nav link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

function initRoomFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const roomCards = document.querySelectorAll(".room-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Show/hide room cards
      roomCards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.classList.add("active")
        } else {
          card.classList.remove("active")
        }
      })
    })
  })

  // Set 'all' as active by default
  if (filterButtons.length > 0) {
    filterButtons[0].click()
  }
}

function initModals() {
  const roomModal = document.getElementById("roomModal")
  const amenityModal = document.getElementById("amenityModal")
  const roomClickCards = document.querySelectorAll(".clickable-card[data-room]")
  const amenityClickCards = document.querySelectorAll(".clickable-card[data-amenity]")

  // Room modal
  roomClickCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h3").textContent
      const icon = card.querySelector(".feature-icon").textContent
      const image =
        card.querySelector(".room-image")?.src ||
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop"
      const details = card.querySelector(".amenity-details").innerHTML

      const modalBody = document.getElementById("modalBody")
      modalBody.innerHTML = `
        <div style="text-align: center;">
          <img src="${image}" alt="${title}" class="modal-image">
          <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${icon} ${title}</h2>
          <p style="font-size: 1.1rem; color: var(--accent-primary); font-weight: bold; margin-bottom: 1rem;">
            ${card.querySelector("p:nth-of-type(2)")?.textContent || ""}
          </p>
          <div style="text-align: left;">${details}</div>
          <div style="margin-top: 2rem;">
            <a href="booking.html" class="btn btn-primary">Book This Room</a>
          </div>
        </div>
      `
      roomModal.classList.add("show")
    })
  })

  // Amenity modal
  amenityClickCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h3").textContent
      const icon = card.querySelector(".feature-icon").textContent
      const image =
        card.querySelector(".room-image")?.src ||
        "https://images.unsplash.com/photo-1504674900569-b73a0ebf0317?w=600&h=400&fit=crop"
      const description = card.querySelector("p").textContent
      const details = card.querySelector(".amenity-details").innerHTML

      const modalBody = document.getElementById("amenityModalBody")
      modalBody.innerHTML = `
        <div>
          <img src="${image}" alt="${title}" class="modal-image">
          <h2 style="font-size: 2rem; margin-bottom: 1rem;">${icon} ${title}</h2>
          <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
            ${description}
          </p>
          <div style="text-align: left;">${details}</div>
        </div>
      `
      amenityModal.classList.add("show")
    })
  })

  // Close modals
  const closeButtons = document.querySelectorAll(".close")
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".modal").classList.remove("show")
    })
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === roomModal) {
      roomModal.classList.remove("show")
    }
    if (e.target === amenityModal) {
      amenityModal.classList.remove("show")
    }
  })
}

// Initialize everything on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeDarkMode()
  initRoomFilters()
  initModals()
})

// Listen for system preference changes
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (localStorage.getItem("darkMode") === null) {
      if (e.matches) {
        enableDarkMode()
      } else {
        disableDarkMode()
      }
    }
  })
}
