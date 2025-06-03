document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const feedbackModal = document.getElementById('feedbackModal');
    const openModalBtns = document.querySelectorAll('.btn-primary[href="contact.html"], #openFeedbackModalBtn');
    const closeModalBtn = document.querySelector('#feedbackModal .close-button');
    const feedbackForm = document.getElementById('feedbackForm');
    const ratingInputs = document.querySelectorAll('#feedbackForm input[name="rating"]');
    const ratingLabels = document.querySelectorAll('#feedbackForm .rating label');

    // Function to open modal
    function openModal() {
        feedbackModal.style.display = 'flex';
        setTimeout(() => {
            feedbackModal.classList.add('show');
        }, 10);
    }

    // Function to close modal
    function closeModal() {
        feedbackModal.classList.remove('show');
        setTimeout(() => {
            feedbackModal.style.display = 'none';
            if (feedbackForm) feedbackForm.reset();
            ratingLabels.forEach(label => {
                label.style.color = '#ddd';
            });
        }, 300);
    }

    // Add event listeners to all buttons that should open the modal
    if (openModalBtns.length > 0) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // If it's a link, prevent default behavior
                if (btn.tagName === 'A') {
                    e.preventDefault();
                }
                openModal();
            });
        });
    }

    // Close modal when clicking X button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === feedbackModal) {
            closeModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && feedbackModal.classList.contains('show')) {
            closeModal();
        }
    });

    // Rating stars interaction
    if (ratingInputs.length > 0 && ratingLabels.length > 0) {
        ratingLabels.forEach((label, index) => {
            label.setAttribute('data-value', index + 1);
            
            label.addEventListener('mouseover', function() {
                const value = this.getAttribute('data-value');
                ratingLabels.forEach(lbl => {
                    if (parseInt(lbl.getAttribute('data-value')) <= parseInt(value)) {
                        lbl.style.color = '#ffc107';
                    } else {
                        lbl.style.color = '#ddd';
                    }
                });
            });

            label.addEventListener('mouseout', function() {
                let checkedValue = 0;
                ratingInputs.forEach(input => {
                    if (input.checked) {
                        checkedValue = parseInt(input.value);
                    }
                });

                ratingLabels.forEach(lbl => {
                    if (parseInt(lbl.getAttribute('data-value')) <= checkedValue) {
                        lbl.style.color = '#ffc107';
                    } else {
                        lbl.style.color = '#ddd';
                    }
                });
            });

            label.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                ratingInputs.forEach(input => {
                    if (input.value === value) {
                        input.checked = true;
                    }
                });
            });
        });
    }

    // Feedback form submission
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = feedbackForm.querySelector('#feedback-name').value.trim();
            const email = feedbackForm.querySelector('#feedback-email').value.trim();
            const rating = feedbackForm.querySelector('input[name="rating"]:checked');
            const message = feedbackForm.querySelector('#feedback-message').value.trim();

            // Simple validation
            if (!name || !rating || !message) {
                alert('Please fill in all required fields and provide a rating.');
                return;
            }

            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // This typically send the data to a server
            console.log('Feedback submitted:', { name, email, rating: rating.value, message });
            
            // Show success message
            alert('Thank you for your feedback!');
            
            // Reset form and close modal
            feedbackForm.reset();
            closeModal();
        });
    }

    // Booking form submission (if exists)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate form
            const name = bookingForm.querySelector('#name').value.trim();
            const email = bookingForm.querySelector('#email').value.trim();
            const phone = bookingForm.querySelector('#phone').value.trim();
            const eventType = bookingForm.querySelector('#event').value;
            const date = bookingForm.querySelector('#date').value;
            const guests = bookingForm.querySelector('#guests').value;
            
            if (!name || !email || !phone || !eventType || !date || !guests) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the booking data to a server
            console.log('Booking submitted:', { 
                name, email, phone, eventType, date, guests,
                message: bookingForm.querySelector('#message').value.trim()
            });
            
            // Show success message
            alert('Thank you for your booking inquiry! We will contact you soon.');
            
            // Reset form
            bookingForm.reset();
        });
    }
});
