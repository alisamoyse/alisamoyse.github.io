/* =========================================================
   SCROLL REVEAL
========================================================= */

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


/* =========================================================
   PROJECT MEDIA CAROUSELS
========================================================= */

const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {

  const track = carousel.querySelector(".carousel-track");

  const slides = carousel.querySelectorAll(".carousel-slide");

  const dots = carousel.querySelectorAll(".carousel-dot");

  const previousButton =
    carousel.querySelector(".carousel-prev");

  const nextButton =
    carousel.querySelector(".carousel-next");


  let currentSlide = 0;

  let touchStartX = 0;

  let touchEndX = 0;


  /* -----------------------------------------
     SHOW SLIDE
  ----------------------------------------- */

  function showSlide(index) {

    if (index < 0) {
      index = slides.length - 1;
    }

    if (index >= slides.length) {
      index = 0;
    }

    currentSlide = index;


    track.style.transform =
      `translateX(-${currentSlide * 100}%)`;


    dots.forEach((dot, dotIndex) => {

      dot.classList.toggle(
        "active",
        dotIndex === currentSlide
      );

    });


    /* Pause videos that are no longer visible */

    slides.forEach((slide, slideIndex) => {

      const videos =
        slide.querySelectorAll("video");

      if (slideIndex !== currentSlide) {

        videos.forEach((video) => {
          video.pause();
        });

      }

    });

  }


  /* -----------------------------------------
     ARROWS
  ----------------------------------------- */

  if (previousButton) {

    previousButton.addEventListener(
      "click",
      () => {

        showSlide(currentSlide - 1);

      }
    );

  }


  if (nextButton) {

    nextButton.addEventListener(
      "click",
      () => {

        showSlide(currentSlide + 1);

      }
    );

  }


  /* -----------------------------------------
     DOTS
  ----------------------------------------- */

  dots.forEach((dot, index) => {

    dot.addEventListener(
      "click",
      () => {

        showSlide(index);

      }
    );

  });


  /* -----------------------------------------
     TOUCH / SWIPE
  ----------------------------------------- */

  carousel.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    {
      passive: true
    }
  );


  carousel.addEventListener(
    "touchend",
    (event) => {

      touchEndX =
        event.changedTouches[0].screenX;

      handleSwipe();

    },
    {
      passive: true
    }
  );


  function handleSwipe() {

    const swipeDistance =
      touchStartX - touchEndX;


    if (Math.abs(swipeDistance) < 45) {
      return;
    }


    if (swipeDistance > 0) {

      showSlide(currentSlide + 1);

    } else {

      showSlide(currentSlide - 1);

    }

  }


  showSlide(0);

});
