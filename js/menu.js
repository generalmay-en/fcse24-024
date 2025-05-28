document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        const activateTab = (tabId) => {
            tabButtons.forEach(button => button.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
            const activeContent = document.getElementById(tabId);

            if (activeButton) {
                activeButton.classList.add('active');
            }
            if (activeContent) {
                activeContent.classList.add('active');
            }
        };

        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                activateTab(tabId);
            });
        });

        const urlHash = window.location.hash.replace('#', '');
        if (urlHash && document.getElementById(urlHash)) {
            activateTab(urlHash);
        } else if (tabButtons.length > 0) {
            activateTab(tabButtons[0].getAttribute('data-tab'));
        }
    }
});
