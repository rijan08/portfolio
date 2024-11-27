// script.js

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".navbar a");

  // Function to handle navbar highlighting
  const highlightNav = () => {
    let currentSection = null;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100; // Adjust offset for sticky navbar
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        currentSection &&
        link.getAttribute("href") === `#${currentSection}`
      ) {
        link.classList.add("active");
      }
    });
  };

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href").substring(1);
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
  });

  // Add event listeners for scrolling
  window.addEventListener("scroll", highlightNav);

  // Trigger highlightNav on page load
  highlightNav();
});
