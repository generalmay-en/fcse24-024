// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust offset as needed for your fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                    mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) { // Adjust scroll threshold as needed
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            header.classList.add('sticky'); // Add a class for more complex sticky header styling
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.classList.remove('sticky'); // Remove the sticky class
        }
    });
    
    // Testimonial slider
    if (document.querySelector('.testimonial-slider')) {
        const slider = document.querySelector('.testimonial-slider');
        const testimonials = document.querySelectorAll('.testimonial-item');
        const totalTestimonials = testimonials.length;
        let currentIndex = 0;
        const autoSlideInterval = 5000; // 5 seconds [s]
        let slideTimer;

        // Function to show a specific testimonial
        const showTestimonial = (index) => {
            // Hide all testimonials
            testimonials.forEach((item, i) => {
                item.style.display = 'none';
                item.classList.remove('active'); // For potential CSS [Cascading Style Sheets] transitions
            });

            // Show the active testimonial
            testimonials[index].style.display = 'block';
            testimonials[index].classList.add('active');
        };

        // Function to move to the next testimonial
        const nextTestimonial = () => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            showTestimonial(currentIndex);
        };

        // Function to move to the previous testimonial
        const prevTestimonial = () => {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(currentIndex);
        };

        // Initialize slider with the first testimonial
        showTestimonial(currentIndex);

        // Auto-slide functionality
        const startAutoSlide = () => {
            slideTimer = setInterval(nextTestimonial, autoSlideInterval);
        };

        const stopAutoSlide = () => {
            clearInterval(slideTimer);
        };

        startAutoSlide(); // Start auto-sliding when the page loads

        // Optional: Add navigation buttons (if your HTML [HyperText Markup Language] includes them)
        const nextButton = document.querySelector('.testimonial-next');
        const prevButton = document.querySelector('.testimonial-prev');

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                stopAutoSlide();
                nextTestimonial();
                startAutoSlide(); // Restart auto-slide after manual navigation
            });

            prevButton.addEventListener('click', () => {
                stopAutoSlide();
                prevTestimonial();
                startAutoSlide(); // Restart auto-slide after manual navigation
            });
        }

        // Optional: Pause auto-slide on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
});