function loadComponent(url, containerId) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки ${url}: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = data;

        // Если загружаем header — добавляем обработчики событий
        if (containerId === 'header-container') {
          const selects = container.querySelectorAll('select');
          selects.forEach(select => {
            select.addEventListener('change', function () {
              if (this.value) {
                window.location.href = this.value;
              }
            });
          });
        }
      }
    })
    .catch(err => {
      console.error(`Не удалось загрузить компонент: ${url}`, err);
    });
}

// Загружаем header и footer
loadComponent('components/header.html', 'header-container');
loadComponent('components/footer.html', 'footer-container');