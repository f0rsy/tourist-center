document.addEventListener('DOMContentLoaded', function () {
    var index = 0; // Текущий индекс активной группы карточек
    var cards = document.querySelectorAll('.col-md-3'); // Все карточки
    var cardsPerSlide = 3; // Количество карточек на одном слайде

    // Функция для обновления видимости карточек
    function updateCards() {
      cards.forEach((card, i) => {
        if (i >= index && i < index + cardsPerSlide) {
          card.style.display = 'block'; // Показываем группу из трёх карточек
        } else {
          card.style.display = 'none'; // Скрываем остальные
        }
      });
    }

    // Инициализация первого отображения
    updateCards();

    // Обработчики событий для кнопок
    document.getElementById('prevButton').addEventListener('click', function () {
      if (index > 0) {
        index -= cardsPerSlide; // Уменьшаем индекс на количество карточек на слайде
        if (index < 0) index = 0; // Проверяем, чтобы индекс не был отрицательным
        updateCards();
      }
    });

    document.getElementById('nextButton').addEventListener('click', function () {
      if (index + cardsPerSlide < cards.length) {
        index += cardsPerSlide; // Увеличиваем индекс на количество карточек на слайде
        updateCards();
      }
    });
  });
