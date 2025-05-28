document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactMessageDiv = document.getElementById('contactMessage');

    if (contactForm && contactMessageDiv) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            contactMessageDiv.textContent = '';
            contactMessageDiv.className = 'message';

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const subject = contactForm.querySelector('#subject').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (!name || !email || !subject || !message) {
                contactMessageDiv.textContent = 'Please fill in all fields.';
                contactMessageDiv.classList.add('error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                contactMessageDiv.textContent = 'Please enter a valid email address.';
                contactMessageDiv.classList.add('error');
                return;
            }

            contactMessageDiv.textContent = 'Sending message...';
            contactMessageDiv.classList.add('info');

            setTimeout(() => {
                const isSuccess = Math.random() > 0.3;

                if (isSuccess) {
                    contactMessageDiv.textContent = 'Message sent successfully! We will get back to you soon.';
                    contactMessageDiv.classList.remove('info');
                    contactMessageDiv.classList.add('success');
                    contactForm.reset();
                } else {
                    contactMessageDiv.textContent = 'Failed to send message. Please try again later.';
                    contactMessageDiv.classList.remove('info');
                    contactMessageDiv.classList.add('error');
                }
            }, 2000);
        });
    }

    const feedbackModal = document.getElementById('feedbackModal');
    const openModalBtn = document.getElementById('openFeedbackModalBtn');
    const closeModalBtn = document.querySelector('#feedbackModal .close-button');
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackMessageDiv = document.getElementById('feedbackMessage');
    const ratingInputs = document.querySelectorAll('#feedbackForm input[name="rating"]');
    const ratingLabels = document.querySelectorAll('#feedbackForm .rating label');

    if (openModalBtn && feedbackModal && closeModalBtn) {
        openModalBtn.addEventListener('click', function() {
            feedbackModal.style.display = 'flex';
            feedbackModal.classList.add('show');
        });

        closeModalBtn.addEventListener('click', function() {
            feedbackModal.classList.remove('show');
            setTimeout(() => {
                feedbackModal.style.display = 'none';
                feedbackForm.reset();
                feedbackMessageDiv.textContent = '';
                ratingLabels.forEach(label => {
                    label.style.color = '#ddd';
                });
            }, 300);
        });

        window.addEventListener('click', function(event) {
            if (event.target === feedbackModal) {
                feedbackModal.classList.remove('show');
                setTimeout(() => {
                    feedbackModal.style.display = 'none';
                    feedbackForm.reset();
                    feedbackMessageDiv.textContent = '';
                    ratingLabels.forEach(label => {
                        label.style.color = '#ddd';
                    });
                }, 300);
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && feedbackModal.classList.contains('show')) {
                closeModalBtn.click();
            }
        });
    }

    if (ratingInputs.length > 0 && ratingLabels.length > 0) {
        ratingLabels.forEach(label => {
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
                ratingLabels.forEach(lbl => {
                    if (parseInt(lbl.getAttribute('data-value')) <= parseInt(value)) {
                        lbl.style.color = '#ffc107';
                    } else {
                        lbl.style.color = '#ddd';
                    }
                });
            });
        });
    }

    if (feedbackForm && feedbackMessageDiv) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();

            feedbackMessageDiv.textContent = '';
            feedbackMessageDiv.className = 'message';

            const name = feedbackForm.querySelector('#feedbackName').value.trim();
            const email = feedbackForm.querySelector('#feedbackEmail').value.trim();
            const rating = feedbackForm.querySelector('input[name="rating"]:checked');
            const comments = feedbackForm.querySelector('#feedbackComments').value.trim();

            if (!name || !email || !rating || !comments) {
                feedbackMessageDiv.textContent = 'Please fill in all fields and provide a rating.';
                feedbackMessageDiv.classList.add('error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                feedbackMessageDiv.textContent = 'Please enter a valid email address.';
                feedbackMessageDiv.classList.add('error');
                return;
            }

            feedbackMessageDiv.textContent = 'Submitting feedback...';
            feedbackMessageDiv.classList.add('info');

            setTimeout(() => {
                const isSuccess = Math.random() > 0.3;

                if (isSuccess) {
                    feedbackMessageDiv.textContent = 'Thank you for your feedback!';
                    feedbackMessageDiv.classList.remove('info');
                    feedbackMessageDiv.classList.add('success');
                    feedbackForm.reset();
                    ratingLabels.forEach(label => {
                        label.style.color = '#ddd';
                    });
                } else {
                    feedbackMessageDiv.textContent = 'Failed to submit feedback. Please try again.';
                    feedbackMessageDiv.classList.remove('info');
                    feedbackMessageDiv.classList.add('error');
                }
            }, 2000);
        });
    }
});
