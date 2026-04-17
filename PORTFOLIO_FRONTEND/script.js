const revealElements = document.querySelectorAll('.reveal');
const aboutImage = document.querySelector('.about-image img');
const projectCards = document.querySelectorAll('.project-card');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  // Reveal general sections
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < windowHeight - 100) {
      el.classList.add('active');
    }
  });

  // Reveal About image
  if(aboutImage) {
    const imgTop = aboutImage.getBoundingClientRect().top;
    if(imgTop < windowHeight - 100) {
      aboutImage.classList.add('active');
    }
  }

  // Reveal project cards
  projectCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if(top < windowHeight - 100) {
      card.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);



const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function highlightNav() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightNav);














   




/* Theme toggle (safe) */
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Toggle icon
  if(document.body.classList.contains('dark-mode')) {
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }
});






















