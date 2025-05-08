 const titles = ["СВЕТЛОЕ", "ТРЕХРЕЧЬЕ"];
  const descriptions = [
    "Это место силы, где природа и архитектура сплетаются в магический узор.",
    "Здесь сливаются три реки, открывая путь в тишину."
  ];
  const backgrounds = [
    "photo/slider1.png",
    "photo/slider2.png"
  ];

  let currentIndex = 0;

  const titleCurrent = document.querySelector('.title-current');
  const titleNext = document.querySelector('.title-next');
  const desc = document.querySelector('.slide-description');

  const bgWrapper = document.querySelector('.bg-wrapper');
  const bgElements = bgWrapper.querySelectorAll('.slider-bg');

  function animateSlideBackground(nextIndex, direction = 1) {
    const activeBg = bgWrapper.querySelector('.slider-bg.active');
    const nextBg = bgWrapper.querySelector('.slider-bg.next');

    nextBg.src = backgrounds[nextIndex];
    nextBg.style.transform = `translateX(${direction * 100}%)`;

    requestAnimationFrame(() => {
      activeBg.style.transform = `translateX(${-direction * 100}%)`;
      nextBg.style.transform = `translateX(0)`;
    });

    setTimeout(() => {
      activeBg.classList.remove('active');
      nextBg.classList.remove('next');
      activeBg.style.transform = `translateX(0)`;

      bgWrapper.appendChild(activeBg);

      activeBg.classList.add('next');
      nextBg.classList.add('active');
    }, 800);
  }

  function slideTo(index, direction = 1) {
  titleNext.textContent = titles[index];

  // Устанавливаем начальное положение у правого края
  gsap.set(titleNext, { x: '0%', opacity: 0.3 });

  const tl = gsap.timeline();

  // Текущий заголовок уезжает влево
  tl.to(titleCurrent, {
    x: `${-direction * 100}%`,
    opacity: 0.2,
    duration: 0.8,
    ease: 'power3.inOut'
  }, 0);

  // Следующий — из правого края (right: 0) плавно въезжает
  tl.fromTo(titleNext,
    { x: '0%', opacity: 0.3 },
    {
      x: '-100%',
      opacity: 1,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        // После анимации: перекидываем текст и сбрасываем состояния
        titleCurrent.textContent = titles[index];
        const futureNext = (index + 1) % titles.length;
        titleNext.textContent = titles[futureNext];
        gsap.set(titleCurrent, { x: '0%', opacity: 1 });
        gsap.set(titleNext, { x: '0%', opacity: 0.3 });
        currentIndex = index;
      }
    }
  );

  // Обновляем описание
  desc.style.opacity = 0;
  setTimeout(() => desc.textContent = descriptions[index], 300);
  setTimeout(() => desc.style.opacity = 1, 500);

  // Анимируем фон
  animateSlideBackground(index, direction);
}

  document.getElementById('next').addEventListener('click', () => {
    const next = (currentIndex + 1) % titles.length;
    slideTo(next, 1);
  });

  document.getElementById('prev').addEventListener('click', () => {
    const prev = (currentIndex - 1 + titles.length) % titles.length;
    slideTo(prev, -1);
  });