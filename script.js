// Enhanced Theme Toggle with Mobile and Tablet Support
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    setTheme(savedTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            setTheme(newTheme);
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Touch event support for mobile devices
        themeToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        });
        
        themeToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1)';
            
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            setTheme(newTheme);
        });
    }
    
    function setTheme(theme) {
        // Apply theme to body and html
        body.setAttribute('data-theme', theme);
        html.setAttribute('data-theme', theme);
        
        // Update toggle button icon and text
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            const text = themeToggle.querySelector('.theme-text');
            
            if (theme === 'dark') {
                if (icon) {
                    icon.className = 'fas fa-sun';
                }
                if (text) {
                    text.textContent = 'Light';
                }
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
                themeToggle.title = 'Switch to light mode';
            } else {
                if (icon) {
                    icon.className = 'fas fa-moon';
                }
                if (text) {
                    text.textContent = 'Dark';
                }
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
                themeToggle.title = 'Switch to dark mode';
            }
        }
        
        // Save theme preference
        localStorage.setItem('theme', theme);
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', function(e) {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navContainer = document.querySelector('.nav-container');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navContainer.classList.toggle('menu-open');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
            
            // Update aria attributes for accessibility
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
            hamburger.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navContainer.classList.remove('menu-open');
                body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open menu');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navContainer.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navContainer.classList.remove('menu-open');
                body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open menu');
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navContainer.classList.remove('menu-open');
                body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open menu');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll (mobile optimization)
            if (window.innerWidth <= 768) {
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
    
    // Cost Calculator Enhancement (if on estimate page)
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            calculateCost();
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetCalculator();
        });
    }
    
    function calculateCost() {
        // Get form values
        const roomType = document.getElementById('roomType')?.value;
        const roomSize = parseFloat(document.getElementById('roomSize')?.value) || 0;
        const designType = document.getElementById('designType')?.value;
        const services = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value);
        
        if (!roomType || !roomSize || !designType) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Base rates per sq ft
        const baseRates = {
            'living-room': 1200,
            'bedroom': 1000,
            'kitchen': 1800,
            'bathroom': 1500,
            'office': 900,
            'commercial': 800
        };
        
        // Design type multipliers
        const designMultipliers = {
            'basic': 1,
            'premium': 1.5,
            'luxury': 2.2
        };
        
        // Service costs
        const serviceCosts = {
            'false-ceiling': roomSize * 150,
            'electrical': roomSize * 200,
            'plumbing': roomSize * 180,
            'flooring': roomSize * 300,
            'painting': roomSize * 100,
            'woodwork': roomSize * 400,
            'lighting': roomSize * 250
        };
        
        // Calculate base cost
        let baseCost = baseRates[roomType] * roomSize * designMultipliers[designType];
        
        // Add service costs
        let serviceCost = services.reduce((total, service) => {
            return total + (serviceCosts[service] || 0);
        }, 0);
        
        let totalCost = baseCost + serviceCost;
        
        // Add GST
        let gst = totalCost * 0.18;
        let finalCost = totalCost + gst;
        
        // Display results with animation
        displayResults(baseCost, serviceCost, gst, finalCost);
    }
    
    function displayResults(baseCost, serviceCost, gst, finalCost) {
        const resultsSection = document.getElementById('results');
        if (!resultsSection) return;
        
        resultsSection.innerHTML = `
            <div class="results-card animate-in">
                <h3><i class="fas fa-calculator"></i> Cost Breakdown</h3>
                <div class="cost-breakdown">
                    <div class="cost-item">
                        <span>Base Interior Cost:</span>
                        <span>₹${baseCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="cost-item">
                        <span>Additional Services:</span>
                        <span>₹${serviceCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="cost-item">
                        <span>GST (18%):</span>
                        <span>₹${gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="cost-item total">
                        <span>Total Estimated Cost:</span>
                        <span>₹${finalCost.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <div class="results-note">
                    <p><i class="fas fa-info-circle"></i> This is an approximate estimate. Final costs may vary based on material selection, site conditions, and specific requirements.</p>
                </div>
                <div class="results-actions">
                    <a href="contact.html" class="btn btn-primary">
                        <i class="fas fa-phone"></i> Get Detailed Quote
                    </a>
                    <a href="https://wa.me/918900758833?text=Hi, I got an estimate of ₹${finalCost.toLocaleString('en-IN')} from your calculator. I'd like to discuss my project." 
                       target="_blank" class="btn btn-secondary">
                        <i class="fab fa-whatsapp"></i> Share on WhatsApp
                    </a>
                </div>
            </div>
        `;
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        showNotification('Cost calculated successfully!', 'success');
    }
    
    function resetCalculator() {
        // Reset all form fields
        const form = document.querySelector('.calculator-form');
        if (form) {
            form.reset();
        }
        
        // Hide results
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
            resultsSection.style.display = 'none';
            resultsSection.innerHTML = '';
        }
        
        showNotification('Calculator reset successfully!', 'info');
    }
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            });
        }
    }
    
    function getNotificationIcon(type) {
        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll events
    const optimizedScrollHandler = debounce(function() {
        // Handle scroll-based animations or effects here
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 16); // ~60fps
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    // Touch gesture support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Horizontal swipe detection
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                // Swipe left
                window.dispatchEvent(new CustomEvent('swipeLeft'));
            } else if (diffX < -50) {
                // Swipe right
                window.dispatchEvent(new CustomEvent('swipeRight'));
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    }, { passive: true });
    
    // Initialize tooltips for mobile
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                showTooltip(this, tooltip);
            }
        });
    });
    
    function showTooltip(element, text) {
        // Remove existing tooltips
        document.querySelectorAll('.mobile-tooltip').forEach(tip => tip.remove());
        
        const tooltip = document.createElement('div');
        tooltip.className = 'mobile-tooltip';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => tooltip.classList.add('show'), 100);
        setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => tooltip.remove(), 300);
        }, 3000);
    }
});

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Add CSS for enhanced mobile and tablet support
const mobileStyles = `
<style>
/* Enhanced Mobile and Tablet Theme Toggle Styles */
.theme-toggle {
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    padding: 0.6rem 1rem;
    color: #3b82f6;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    min-height: 44px; /* iOS touch target minimum */
    min-width: 44px;
    justify-content: center;
}

.theme-toggle:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
}

.theme-toggle:active {
    transform: scale(0.95);
}

.theme-toggle i {
    font-size: 1.1rem;
    transition: all 0.3s ease;
}

.theme-text {
    display: none;
}

/* Dark theme toggle styles */
[data-theme="dark"] .theme-toggle {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    color: #fbbf24;
}

[data-theme="dark"] .theme-toggle:hover {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.4);
}

/* Mobile specific styles */
@media (max-width: 768px) {
    .theme-toggle {
        padding: 0.5rem;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        min-width: 44px;
        min-height: 44px;
    }
    
    .theme-text {
        display: none !important;
    }
    
    /* Enhanced mobile navigation */
    .nav-menu.active {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }
    
    [data-theme="dark"] .nav-menu.active {
        background: rgba(30, 41, 59, 0.98);
    }
    
    /* Mobile hamburger enhancement */
    .hamburger {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    
    .hamburger:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .hamburger:active {
        transform: scale(0.95);
    }
}

/* Tablet specific styles */
@media (min-width: 769px) and (max-width: 1024px) {
    .theme-toggle {
        padding: 0.7rem 1.2rem;
        gap: 0.6rem;
    }
    
    .theme-text {
        display: inline;
        font-size: 0.85rem;
    }
}

/* Large tablet and small desktop */
@media (min-width: 1025px) {
    .theme-toggle {
        padding: 0.8rem 1.5rem;
        gap: 0.7rem;
    }
    
    .theme-text {
        display: inline;
        font-size: 0.9rem;
    }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
    .theme-toggle {
        min-height: 48px;
        min-width: 48px;
        padding: 0.8rem;
    }
    
    .theme-toggle:hover {
        transform: none;
    }
    
    .theme-toggle:active {
        transform: scale(0.95);
        background: rgba(255, 255, 255, 0.2);
    }
    
    [data-theme="dark"] .theme-toggle:active {
        background: rgba(0, 0, 0, 0.4);
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .theme-toggle {
        border-width: 3px;
        border-color: currentColor;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .theme-toggle {
        transition: none;
    }
    
    .theme-toggle i {
        transition: none;
    }
}

/* Notification styles for mobile */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    left: 20px;
    z-index: 10000;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    transform: translateY(-100px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 400px;
    margin: 0 auto;
}

.notification.show {
    transform: translateY(0);
    opacity: 1;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
}

.notification-success {
    border-left: 4px solid #10b981;
}

.notification-error {
    border-left: 4px solid #ef4444;
}

.notification-warning {
    border-left: 4px solid #f59e0b;
}

.notification-info {
    border-left: 4px solid #3b82f6;
}

.notification-close {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    margin-left: auto;
    min-width: 32px;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-close:hover {
    background: rgba(0, 0, 0, 0.05);
}

/* Mobile tooltip styles */
.mobile-tooltip {
    position: fixed;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    z-index: 10000;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    pointer-events: none;
    max-width: 200px;
    text-align: center;
}

.mobile-tooltip.show {
    opacity: 1;
    transform: translateY(0);
}

.mobile-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
}

/* Dark theme notifications */
[data-theme="dark"] .notification {
    background: #1e293b;
    color: #f1f5f9;
}

[data-theme="dark"] .notification-close {
    color: #94a3b8;
}

[data-theme="dark"] .notification-close:hover {
    background: rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments for very small screens */
@media (max-width: 360px) {
    .notification {
        left: 10px;
        right: 10px;
        top: 10px;
    }
    
    .notification-content {
        padding: 0.75rem 1rem;
        gap: 0.75rem;
    }
    
    .theme-toggle {
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
        padding: 0.4rem;
    }
}
</style>
`;

// Inject the mobile styles
document.head.insertAdjacentHTML('beforeend', mobileStyles);