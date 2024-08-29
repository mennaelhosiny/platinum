const toggleBtn = document.querySelector('.toggle-btn');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');

let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.slider .list');
let thumbnail = document.querySelector('.slider .thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');

thumbnail.appendChild(thumbnailItems[0]);

// Function for next button 
nextBtn.onclick = function() {
    moveSlider('next');
};

// Function for prev button 
prevBtn.onclick = function() {
    moveSlider('prev');
};

function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item');
    let thumbnailItems = document.querySelectorAll('.thumbnail .item');
    
    if(direction === 'next') {
        // For RTL, "next" should prepend the first item to the end
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        slider.classList.add('next');
    } else {
        // For RTL, "prev" should append the last item to the beginning
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        slider.classList.add('prev');
    }

    slider.addEventListener('animationend', function() {
        if(direction === 'next') {
            slider.classList.remove('next');
        } else {
            slider.classList.remove('prev');
        }
    }, {once: true}); // Remove the event listener after it's triggered once
}

// Auto-play function
function autoPlay() {
    setInterval(() => {
        moveSlider('next');
    }, 3000); // Change slides every 3 seconds
}

// Start auto-play
autoPlay();


// service
const sliders = document.querySelector("[data-slider]");

const track = sliders.querySelector("[data-slider-track]");
const prev = sliders.querySelector("[data-slider-prev]");
const next = sliders.querySelector("[data-slider-next]");

let autoMoveInterval;

// Clone all slides and append them to the end of the track
const slides = Array.from(track.children);
slides.forEach(slide => {
  const clone = slide.cloneNode(true);
  track.appendChild(clone);
});

const slideWidth = track.firstElementChild.offsetWidth;
const totalSlides = slides.length;

const moveNext = () => {
  // Check if we are at the end of the original slides
  if (track.scrollLeft >= (slideWidth * totalSlides)) {
    track.scrollLeft = 0; // Instantly jump back to the start
  }

  track.scrollBy({
    left: slideWidth * -1, // Move one slide to the left in RTL
    behavior: "smooth"
  });
};

const movePrev = () => {
  // Check if we are at the start and need to jump to the end
  if (track.scrollLeft <= 0) {
    track.scrollLeft = slideWidth * totalSlides; // Instantly jump to the last original slide
  }

  track.scrollBy({
    left: slideWidth, // Move one slide to the right in RTL
    behavior: "smooth"
  });
};

if (track) {
  prev.addEventListener("click", () => {
    movePrev();
    resetAutoMove();
  });

  next.addEventListener("click", () => {
    moveNext();
    resetAutoMove();
  });

  const autoMove = () => {
    moveNext(); // Automatically move to the next slide
  };

  const resetAutoMove = () => {
    clearInterval(autoMoveInterval);
    autoMoveInterval = setInterval(autoMove, 3000); // Move every 3 seconds
  };

  resetAutoMove();
}


// feedback
var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });

