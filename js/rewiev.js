document.addEventListener('DOMContentLoaded', function () {
    var index = 0; 
    var cards = document.querySelectorAll('.col-md-3'); 
    var cardsPerSlide = 3; 

    function updateCards() {
      cards.forEach((card, i) => {
        if (i >= index && i < index + cardsPerSlide) {
          card.style.display = 'block'; 
        } else {
          card.style.display = 'none'; 
        }
      });
    }

    updateCards();

    document.getElementById('prevButton').addEventListener('click', function () {
      if (index > 0) {
        index -= cardsPerSlide; 
        if (index < 0) index = 0;
        updateCards();
      }
    });

    document.getElementById('nextButton').addEventListener('click', function () {
      if (index + cardsPerSlide < cards.length) {
        index += cardsPerSlide; 
        updateCards();
      }
    });
  });
