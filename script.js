// ========================================================
// ========================================================
// SCROLL REVEAL
// ========================================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");

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
