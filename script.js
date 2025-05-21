let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const rotateNotice = document.getElementById('rotate-notice');

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

let scale = 1;

function zoomIn() {
  if (scale < 2) {
    scale += 0.1;
    applyZoom();
  }
}

function zoomOut() {
  if (scale > 0.5) {
    scale -= 0.1;
    applyZoom();
  }
}

function applyZoom() {
  slides.forEach(slide => {
    slide.style.transform = `scale(${scale})`;
    slide.style.transformOrigin = 'center center';
  });
}

// ✨ جلوگیری از زوم دو انگشت
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('touchmove', e => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

// ✨ شناسایی آیفون و چرخش صفحه
function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function checkOrientation() {
  if (isIOS() && window.innerHeight > window.innerWidth) {
    rotateNotice.classList.remove('hidden');
  } else {
    rotateNotice.classList.add('hidden');
  }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('load', () => {
  checkOrientation();
  showSlide(currentSlide);
});
