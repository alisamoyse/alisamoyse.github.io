// ========================================================
// SCROLL REVEAL
// ========================================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");

        // Stop observing after it has animated once
        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// ========================================================
// SUBTLE NAV FADE WHEN SCROLLING
// ========================================================

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

  if (window.scrollY > 100) {
    nav.style.opacity = "0.85";
  } else {
    nav.style.opacity = "1";
  }

});

nav.addEventListener("mouseenter", () => {
  nav.style.opacity = "1";
});