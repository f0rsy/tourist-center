// const titles = ["СВЕТЛОЕ", "ТРЕХРЕЧЬЕ"];
//   const descriptions = [
//     "Это место силы, где природа и архитектура сплетаются в магический узор.",
//     "Здесь сливаются три реки, открывая путь в тишину."
//   ];
//   const backgrounds = [
//     "photo/slider1.png",
//     "photo/slider2.png"
//   ];

//   let currentIndex = 0;
//   let bgImg = document.querySelector('.slider-bg');
//   const slider = document.querySelector('.slider');
//   const bgContainer = document.querySelector('.slider-bg-container');
//   const title = document.querySelector('.slider-title');
//   const desc = document.querySelector('.slider-description');

//   function changeSlide(nextIndex, direction = 1) {
//     const tl = gsap.timeline();

//     tl.to([title, desc], {
//       x: direction * -50,
//       opacity: 0,
//       duration: 0.4,
//       ease: 'power2.out'
//     });

//     tl.call(() => {
//       title.textContent = titles[nextIndex];
//       desc.textContent = descriptions[nextIndex];
//     });

//     tl.fromTo([title, desc],
//       { x: direction * 50, opacity: 0 },
//       { x: 0, opacity: 1, duration: 0.4, ease: 'power2.inOut' }
//     );

//     currentIndex = nextIndex;
//   }

//   function buttonSlide(direction = 1) {
//     const nextIndex = (currentIndex + direction + titles.length) % titles.length;

//     const nextBg = document.createElement('img');
//     nextBg.className = 'slider-bg';
//     nextBg.src = backgrounds[nextIndex];
//     nextBg.style.position = 'absolute';
//     nextBg.style.top = 0;
//     nextBg.style.left = 0;
//     nextBg.style.width = '100%';
//     nextBg.style.height = '100%';
//     nextBg.style.objectFit = 'cover';
//     nextBg.style.zIndex = 1;
//     nextBg.style.transform = `translateX(${direction * 100}%)`;
//     bgContainer.appendChild(nextBg);

//     const tl = gsap.timeline({
//       onComplete: () => {
//         bgImg.remove();
//         bgImg = nextBg;
//       }
//     });

//     tl.to([bgImg, nextBg], {
//       x: (i) => (i === 0 ? -direction * 100 : 0) + '%',
//       duration: 0.8,
//       ease: 'power3.inOut'
//     });

//     changeSlide(nextIndex, direction);
//   }

//   document.getElementById('next').addEventListener('click', () => buttonSlide(1));
//   document.getElementById('prev').addEventListener('click', () => buttonSlide(-1));

//   // ===== Свайп-поддержка (моб. и ПК) =====
//   let startX = 0;
//   let isDragging = false;
//   let currentTranslate = 0;
//   let animationFrame;

//   function setTranslate(x) {
//     if (bgImg) {
//       bgImg.style.transform = `translateX(${x}px)`;
//     }
//   }

//   function touchStart(e) {
//     isDragging = true;
//     startX = e.touches ? e.touches[0].clientX : e.clientX;
//     animationFrame = requestAnimationFrame(updatePosition);
//   }

//   function touchMove(e) {
//     if (!isDragging) return;
//     const currentX = e.touches ? e.touches[0].clientX : e.clientX;
//     currentTranslate = currentX - startX;
//   }

//   function touchEnd() {
//     cancelAnimationFrame(animationFrame);
//     isDragging = false;

//     if (Math.abs(currentTranslate) > 50) {
//       if (currentTranslate < 0) {
//         buttonSlide(1);
//       } else {
//         buttonSlide(-1);
//       }
//     } else {
//       gsap.to(bgImg, {
//         x: 0,
//         duration: 0.3,
//         ease: 'power2.out'
//       });
//     }

//     currentTranslate = 0;
//   }

//   function updatePosition() {
//     if (isDragging) {
//       setTranslate(currentTranslate);
//       animationFrame = requestAnimationFrame(updatePosition);
//     }
//   }

//   slider.addEventListener('touchstart', touchStart);
//   slider.addEventListener('touchmove', touchMove);
//   slider.addEventListener('touchend', touchEnd);

//   slider.addEventListener('mousedown', touchStart);
//   slider.addEventListener('mousemove', touchMove);
//   slider.addEventListener('mouseup', touchEnd);
//   slider.addEventListener('mouseleave', () => { if (isDragging) touchEnd(); });














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
  let bgImg = document.querySelector('.slider-bg');
  const slider = document.querySelector('.slider');
  const bgContainer = document.querySelector('.slider-bg-container');
  const titleCurrent = document.querySelector('.slider-title-current');
  const titleNext = document.querySelector('.slider-title-next');
  const desc = document.querySelector('.slider-description');

  function changeSlide(nextIndex, direction = 1) {
    const futureNextIndex = (nextIndex + 1) % titles.length;

    const tl = gsap.timeline();

    // Анимация уезда текущего заголовка, текста
    tl.to([titleCurrent, desc], {
      x: direction * -50,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });

    // Заголовок справа уезжает в центр
    tl.to(titleNext, {
      x: '-100%',
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0);

    // Обновление контента
    tl.call(() => {
      titleCurrent.textContent = titles[nextIndex];
      titleNext.textContent = titles[futureNextIndex];
      desc.textContent = descriptions[nextIndex];

      // Сброс позиций
      gsap.set(titleCurrent, { x: 50 * direction, opacity: 0 });
      gsap.set(titleNext, { x: 0, opacity: 0.3 });
    });

    // Возврат анимации
    tl.to(titleCurrent, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    });

    tl.to(desc, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    }, "<");

    currentIndex = nextIndex;
  }

  function buttonSlide(direction = 1) {
    const nextIndex = (currentIndex + direction + titles.length) % titles.length;

    const nextBg = document.createElement('img');
    nextBg.className = 'slider-bg';
    nextBg.src = backgrounds[nextIndex];
    nextBg.style.position = 'absolute';
    nextBg.style.top = 0;
    nextBg.style.left = 0;
    nextBg.style.width = '100%';
    nextBg.style.height = '100%';
    nextBg.style.objectFit = 'cover';
    nextBg.style.zIndex = 1;
    nextBg.style.transform = `translateX(${direction * 100}%)`;
    bgContainer.appendChild(nextBg);

    const tl = gsap.timeline({
      onComplete: () => {
        bgImg.remove();
        bgImg = nextBg;
      }
    });

    tl.to([bgImg, nextBg], {
      x: (i) => (i === 0 ? -direction * 100 : 0) + '%',
      duration: 0.8,
      ease: 'power3.inOut'
    });

    changeSlide(nextIndex, direction);
  }

  document.getElementById('next').addEventListener('click', () => buttonSlide(1));
  document.getElementById('prev').addEventListener('click', () => buttonSlide(-1));

  // ===== Свайп-поддержка (моб. и ПК) =====
  let startX = 0;
  let isDragging = false;
  let currentTranslate = 0;
  let animationFrame;

  function setTranslate(x) {
    if (bgImg) {
      bgImg.style.transform = `translateX(${x}px)`;
    }
  }

  function touchStart(e) {
    isDragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    animationFrame = requestAnimationFrame(updatePosition);
  }

  function touchMove(e) {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    currentTranslate = currentX - startX;
  }

  function touchEnd() {
    cancelAnimationFrame(animationFrame);
    isDragging = false;

    if (Math.abs(currentTranslate) > 50) {
      if (currentTranslate < 0) {
        buttonSlide(1);
      } else {
        buttonSlide(-1);
      }
    } else {
      gsap.to(bgImg, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    currentTranslate = 0;
  }

  function updatePosition() {
    if (isDragging) {
      setTranslate(currentTranslate);
      animationFrame = requestAnimationFrame(updatePosition);
    }
  }

  slider.addEventListener('touchstart', touchStart);
  slider.addEventListener('touchmove', touchMove);
  slider.addEventListener('touchend', touchEnd);

  slider.addEventListener('mousedown', touchStart);
  slider.addEventListener('mousemove', touchMove);
  slider.addEventListener('mouseup', touchEnd);
  slider.addEventListener('mouseleave', () => { if (isDragging) touchEnd(); });
