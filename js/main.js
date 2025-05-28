document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                    mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (mobileMenuToggle) { // Check if toggle exists before manipulating its icon
                        mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                        mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                    }
                }
            });
        });
    }

    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (currentPath.endsWith(linkPath) || (currentPath === '/' && linkPath === 'index.html')) {
            link.classList.add('current-page-active');
        }
    });

    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
                header.classList.add('sticky');
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.classList.remove('sticky');
            }
        }
    });

    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (document.querySelector('.testimonial-slider')) {
        const slider = document.querySelector('.testimonial-slider');
        const testimonials = document.querySelectorAll('.testimonial-item');
        const totalTestimonials = testimonials.length;
        let currentIndex = 0;
        const autoSlideInterval = 5000;
        let slideTimer;

        const showTestimonial = (index) => {
            testimonials.forEach((item, i) => {
                item.style.display = 'none';
                item.classList.remove('active');
            });

            if (testimonials[index]) {
                testimonials[index].style.display = 'block';
                testimonials[index].classList.add('active');
            }
        };

        const nextTestimonial = () => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            showTestimonial(currentIndex);
        };

        const prevTestimonial = () => {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(currentIndex);
        };

        showTestimonial(currentIndex);

        const startAutoSlide = () => {
            stopAutoSlide(); // Ensure only one interval is running
            slideTimer = setInterval(nextTestimonial, autoSlideInterval);
        };

        const stopAutoSlide = () => {
            clearInterval(slideTimer);
        };

        startAutoSlide();

        const nextButton = document.querySelector('.testimonial-next');
        const prevButton = document.querySelector('.testimonial-prev');

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                stopAutoSlide();
                nextTestimonial();
                startAutoSlide();
            });

            prevButton.addEventListener('click', () => {
                stopAutoSlide();
                prevTestimonial();
                startAutoSlide();
            });
        }

        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
});
