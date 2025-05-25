document.addEventListener('DOMContentLoaded', function() {
    // Highlight errors in red
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorEl = formGroup.querySelector('.error-message') || document.createElement('small');
        errorEl.className = 'error-message';
        errorEl.style.color = 'red';
        errorEl.textContent = message;
        formGroup.appendChild(errorEl);
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        const errorEl = formGroup.querySelector('.error-message');
        if (errorEl) errorEl.remove();
    }

    // Booking Form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Validate each field
            ['name', 'email', 'phone', 'event', 'date', 'guests'].forEach(id => {
                const input = document.getElementById(id);
                if (!input.value.trim()) {
                    showError(input, 'This field is required');
                    isValid = false;
                } else {
                    clearError(input);
                }
            });

            if (isValid) {
                alert('Booking inquiry sent! We’ll contact you soon.');
                bookingForm.reset();
            }
        });
    }

    // Feedback Form
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const feedbackMessage = document.getElementById('feedback-message');
            
            if (!feedbackMessage.value.trim()) {
                showError(feedbackMessage, 'Please share your feedback');
            } else {
                alert('Feedback submitted! Thank you.');
                feedbackForm.reset();
            }
        });
    }
});