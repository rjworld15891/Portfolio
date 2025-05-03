// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
        document.body.classList.add('loaded');
    }, 2000);

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Add hover effect to links and buttons
    const links = document.querySelectorAll('a, button, .btn');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid var(--secondary-color)';
            cursorFollower.style.opacity = '0';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--secondary-color)';
            cursor.style.border = 'none';
            cursorFollower.style.opacity = '0.5';
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });

    // Scroll animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') + '%';
            bar.style.width = progress;
        });
    }
    
    // Animate skill bars when skills section is in view
    const skillsSection = document.querySelector('#skills');
    
    function checkSkillsInView() {
        if (skillsSection) {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                animateSkillBars();
                window.removeEventListener('scroll', checkSkillsInView);
            }
        }
    }
    
    window.addEventListener('scroll', checkSkillsInView);
    
    // Initial check
    checkSkillsInView();

    // 3D Tilt Effect
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const rotateX = (0.5 - yPercent) * 10;
            const rotateY = (xPercent - 0.5) * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            const inner = this.querySelector('.tilt-inner');
            if (inner) {
                inner.style.transform = `translateZ(30px)`;
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            const inner = this.querySelector('.tilt-inner');
            if (inner) {
                inner.style.transform = 'translateZ(0)';
            }
        });
    });

    // Matrix Rain Effect
    function createMatrixRain() {
        const container = document.querySelector('.matrix-container');
        if (!container) return;
        
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const columns = Math.floor(container.offsetWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            const drop = document.createElement('div');
            drop.className = 'matrix-rain';
            drop.style.left = `${i * 20}px`;
            drop.style.animationDuration = `${Math.random() * 3 + 2}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            
            drop.textContent = text;
            container.appendChild(drop);
        }
    }
    
    // Initialize matrix rain if container exists
    createMatrixRain();

    // Glitch effect for text
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        const text = element.textContent;
        element.setAttribute('data-text', text);
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = this.querySelectorAll('.form-control');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (valid) {
                // Here you would normally send the form data to a server
                // For demo purposes, just show a success message
                const formMessage = document.createElement('div');
                formMessage.className = 'alert alert-success mt-3';
                formMessage.textContent = 'Your message has been sent successfully!';
                
                this.appendChild(formMessage);
                this.reset();
                
                setTimeout(() => {
                    formMessage.remove();
                }, 5000);
            }
        });
    }

    // Particle background
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#64ffda'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#64ffda',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});