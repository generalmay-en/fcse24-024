document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.classList.remove('filtered-out');
                        item.classList.add('filtered-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('filtered-in');
                        item.classList.add('filtered-out');
                    }
                });
            });
        });

        const allButton = document.querySelector('.filter-buttons button[data-filter="all"]');
        if (allButton) {
            allButton.click();
        }
    }

    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightboxBtn = document.querySelector('#lightboxModal .close-button');
    const prevButton = document.getElementById('lightboxPrev');
    const nextButton = document.getElementById('lightboxNext');

    let currentGalleryItems = [];
    let currentIndex = 0;

    const openLightbox = (index) => {
        currentGalleryItems = Array.from(document.querySelectorAll('.gallery-grid .gallery-item[style*="display: block"]'));
        if (currentGalleryItems.length === 0) return;

        currentIndex = index;
        const item = currentGalleryItems[currentIndex];
        const mediaType = item.getAttribute('data-type');
        const mediaSrc = item.getAttribute('data-src');
        const caption = item.getAttribute('data-caption') || '';

        lightboxImage.style.display = 'none';
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();

        if (mediaType === 'image') {
            lightboxImage.src = mediaSrc;
            lightboxImage.style.display = 'block';
        } else if (mediaType === 'video') {
            lightboxVideo.src = mediaSrc;
            lightboxVideo.style.display = 'block';
            lightboxVideo.play();
        }

        lightboxCaption.textContent = caption;
        lightboxModal.style.display = 'flex';
        lightboxModal.classList.add('show');
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const visibleItems = Array.from(document.querySelectorAll('.gallery-grid .gallery-item[style*="display: block"]'));
            const clickedItemIndex = visibleItems.indexOf(item);
            if (clickedItemIndex !== -1) {
                openLightbox(clickedItemIndex);
            }
        });
    });

    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', function() {
            lightboxModal.classList.remove('show');
            setTimeout(() => {
                lightboxModal.style.display = 'none';
                lightboxVideo.pause();
                lightboxVideo.currentTime = 0;
            }, 300);
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === lightboxModal) {
            closeLightboxBtn.click();
        }
    });

    const navigateLightbox = (direction) => {
        if (currentGalleryItems.length === 0) return;

        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = currentGalleryItems.length - 1;
        } else if (currentIndex >= currentGalleryItems.length) {
            currentIndex = 0;
        }
        openLightbox(currentIndex);
    };

    if (prevButton) {
        prevButton.addEventListener('click', () => navigateLightbox(-1));
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => navigateLightbox(1));
    }

    document.addEventListener('keydown', function(event) {
        if (lightboxModal.classList.contains('show')) {
            if (event.key === 'Escape') {
                closeLightboxBtn.click();
            } else if (event.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (event.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });
});
