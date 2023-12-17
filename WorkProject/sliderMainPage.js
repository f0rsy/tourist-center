document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('slider');
    const slides = slider.querySelector('.slideries');
    let slideIndex = 0;
    let interval;

    function moveSlide() {
        slideIndex = (slideIndex + 1) % slides.children.length;
        updateSlidePosition();
    }

    function updateSlidePosition() {
        slides.style.transform = `translateX(-${slideIndex * (100 / slides.children.length)}%)`;
    }
    

    function startAutoSlide() {
        interval = setInterval(moveSlide, 3000); // Изменяет слайд каждые 3 секунды
    }

    startAutoSlide();
});
