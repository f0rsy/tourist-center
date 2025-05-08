function loadComponent(url, containerId) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки ${url}: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(err => {
      console.error(err);
    });
}

loadComponent('components/header.html', 'header-container');

loadComponent('components/footer.html', 'footer-container');

fetch('components/header.html')
  .then(response => response.text())
  .then(data => {
    const headerContainer = document.getElementById('header-container');
    headerContainer.innerHTML = data;

    const selects = headerContainer.querySelectorAll('select');
    selects.forEach(select => {
      select.addEventListener('change', function () {
        if (this.value) {
          window.location.href = this.value;
        }
      });
    });

  })
  .catch(err => {
    console.error('Ошибка при загрузке header.html:', err);
  });