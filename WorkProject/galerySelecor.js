document.getElementById('gallerySelect').addEventListener('change', function() {
    // Скрываем все галереи
    var galleries = document.querySelectorAll('.gallery');
    galleries.forEach(function(gallery) {
        gallery.style.display = 'none';
    });

    // Показываем выбранную галерею, если выбрано не "Документы"
    if (this.value) {
        var selectedGallery = document.getElementById(this.value);
        if (selectedGallery) {
            selectedGallery.style.display = 'block';
        }
    }
});
