const PASSWORD_VALUE = 'Kivuruga coco';
const PASSWORD_STORAGE_KEY = 'kivurugaCocoUnlocked';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    enforcePasswordProtection();
    initializeSiteFeatures();
});

function initializeSiteFeatures() {
    // Smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add floating sparkles to hero section
    createFloatingSparkles();

    // Gallery modal functionality
    setupGalleryModal();

    // Add typing effect to hero subtitle
    addTypingEffect();

    // Add parallax effect to sections
    addParallaxEffect();

    // Add heart particles on scroll
    addHeartParticles();
}

function enforcePasswordProtection() {
    const overlay = document.getElementById('passwordOverlay');
    const form = document.getElementById('passwordForm');
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('passwordError');

    if (!overlay || !form || !input) {
        return;
    }

    const unlockSite = () => {
        overlay.classList.add('hidden');
        document.body.classList.remove('password-locked');
        if (error) {
            error.textContent = '';
        }
        localStorage.setItem(PASSWORD_STORAGE_KEY, 'true');
    };

    if (localStorage.getItem(PASSWORD_STORAGE_KEY) === 'true') {
        unlockSite();
        return;
    }

    document.body.classList.add('password-locked');
    input.focus();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value.trim() === PASSWORD_VALUE) {
            unlockSite();
        } else {
            if (error) {
                error.textContent = 'Nenosiri si sahihi. Jaribu tena.';
            }
            input.value = '';
            input.focus();
        }
    });
}

// Create floating sparkles animation
function createFloatingSparkles() {
    const heroSection = document.querySelector('.hero-section');
    const sparkleCount = 15;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkleFloat ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
            z-index: 1;
        `;
        heroSection.appendChild(sparkle);
    }

    // Add sparkle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
                opacity: 0.7;
            }
            50% { 
                transform: translateY(-30px) rotate(180deg); 
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Setup gallery modal
function setupGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-caption"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .gallery-modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(90, 62, 133, 0.9);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            position: relative;
            margin: 5% auto;
            max-width: 80%;
            max-height: 80%;
            text-align: center;
        }
        
        .modal-image {
            max-width: 100%;
            max-height: 70vh;
            border-radius: 15px;
            border: 3px solid #C7A4FF;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 35px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s;
        }
        
        .modal-close:hover {
            color: #FFCEDF;
        }
        
        .modal-caption {
            color: white;
            font-style: italic;
            margin-top: 1rem;
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(modalStyles);

    // Add click events to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption');
            
            modal.querySelector('.modal-image').src = img.src;
            modal.querySelector('.modal-image').alt = img.alt;
            modal.querySelector('.modal-caption').textContent = caption.textContent;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Add typing effect to hero subtitle
function addTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing effect after a delay
    setTimeout(typeWriter, 2000);
}

// Add parallax effect
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image, .meaning-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add heart particles on scroll
function addHeartParticles() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Only create particles when scrolling down
        if (currentScrollY > lastScrollY && Math.random() > 0.8) {
            createHeartParticle();
        }
        
        lastScrollY = currentScrollY;
    });
}

function createHeartParticle() {
    const heart = document.createElement('div');
    heart.innerHTML = '💜';
    heart.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 20 + 15}px;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 3s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

// Add float up animation for heart particles
const heartParticleStyle = document.createElement('style');
heartParticleStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartParticleStyle);

// Add smooth reveal animations for timeline items
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        timelineObserver.observe(item);
    });
}

// Initialize timeline animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateTimelineItems);

// Add gentle hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.apology-subsection, .timeline-text');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #C7A4FF 0%, #FFCEDF 100%);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: '💜';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            z-index: 10000;
            animation: pulse 1s ease-in-out infinite;
        }
    `;
    document.head.appendChild(loadingStyles);
});