function initializeSlider(sliderElement) {
    let currentSlide = 0;
    const slides = sliderElement.querySelectorAll('.slide');
    const totalSlides = slides.length;
  
    function showSlide(index) {
      slides.forEach((slide) => {
        slide.style.display = 'none';
      });
      slides[index].style.display = 'block';
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }
  
    setInterval(nextSlide, 4000);
  
    showSlide(currentSlide);
  }
  
  document.querySelectorAll('.slider2').forEach(initializeSlider);

  function scrollToFirstText() {
    const firstTextElement = document.getElementById("first-text");
    window.scrollTo({
        top: firstTextElement.offsetTop,
        behavior: "smooth"
    });
}