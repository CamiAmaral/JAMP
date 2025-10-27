// JAMP - Soporte Técnico Informático
// JavaScript para funcionalidades del sitio web

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Smooth scrolling para enlaces de navegación
    initSmoothScrolling();
    
    // Formulario de contacto
    initContactForm();
    
    // Reseñas
    initReviews();

    // Theme toggle
    initThemeToggle();

    // Navegación activa
    initActiveNavigation();
    
    // Botones de WhatsApp
    initWhatsAppButtons();
    
    // Validación de formularios
    initFormValidation();
    
    // Efectos de scroll
    initScrollEffects();
    
    // Carrusel del hero
    initHeroCarousel();
});

// Smooth scrolling para navegación
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajustar por navbar fija
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar navbar en móvil si está abierto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (validateContactForm()) {
                // Simular envío (en producción se enviaría al servidor)
                showFormSuccess();
                contactForm.reset();
            }
        });
    }
}

// Validación del formulario de contacto
function validateContactForm() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    let isValid = true;
    
    // Limpiar errores previos
    clearFormErrors();
    
    // Validar nombre
    if (nombre === '') {
        showFieldError('nombre', 'El nombre es requerido');
        isValid = false;
    }
    
    // Validar teléfono
    if (telefono === '') {
        showFieldError('telefono', 'El teléfono es requerido');
        isValid = false;
    } else if (!isValidPhone(telefono)) {
        showFieldError('telefono', 'Ingrese un teléfono válido');
        isValid = false;
    }
    
    // Validar mensaje
    if (mensaje === '') {
        showFieldError('mensaje', 'El mensaje es requerido');
        isValid = false;
    }
    
    return isValid;
}

// Validar teléfono uruguayo
function isValidPhone(phone) {
    const phoneRegex = /^(\+598|0)?[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Mostrar error en campo
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.col-md-6') || field.closest('.col-12');
    
    field.classList.add('is-invalid');
    
    let errorDiv = formGroup.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
}

// Limpiar errores del formulario
function clearFormErrors() {
    const invalidFields = document.querySelectorAll('.is-invalid');
    const errorMessages = document.querySelectorAll('.invalid-feedback');
    
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
    errorMessages.forEach(message => message.remove());
}

// Mostrar mensaje de éxito
function showFormSuccess() {
    // Crear modal de éxito
    const successModal = document.createElement('div');
    successModal.className = 'modal fade';
    successModal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title text-success">
                        <i class="fas fa-check-circle me-2"></i>
                        ¡Mensaje enviado!
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
                    <p class="text-muted">También podés contactarnos directamente por WhatsApp para una respuesta más rápida.</p>
                </div>
                <div class="modal-footer border-0 justify-content-center">
                    <a href="https://wa.me/598XXXXXXXX" class="btn btn-whatsapp" target="_blank">
                        <i class="fab fa-whatsapp me-2"></i>
                        Contactar por WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    const modal = new bootstrap.Modal(successModal);
    modal.show();
    
    // Remover modal del DOM después de cerrar
    successModal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(successModal);
    });
}

// Navegación activa
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Botones de WhatsApp
function initWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // En producción, aquí se podría trackear el evento
            console.log('WhatsApp button clicked');
            
            // Opcional: agregar parámetros al enlace de WhatsApp
            const currentUrl = window.location.href;
            const message = encodeURIComponent(`Hola! Vi su sitio web (${currentUrl}) y me interesa conocer más sobre sus servicios de soporte técnico.`);
            
            // Actualizar enlace si es necesario
            if (this.href.includes('wa.me')) {
                this.href = `https://wa.me/598XXXXXXXX?text=${message}`;
            }
        });
    });
}

// Validación de formularios
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Validación en tiempo real
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    });
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    clearFieldError(field);
    
    // Validaciones específicas
    if (field.hasAttribute('required') && value === '') {
        showFieldError(field.id, 'Este campo es requerido');
        return false;
    }
    
    if (fieldType === 'email' && value !== '' && !isValidEmail(value)) {
        showFieldError(field.id, 'Ingrese un email válido');
        return false;
    }
    
    if (fieldType === 'tel' && value !== '' && !isValidPhone(value)) {
        showFieldError(field.id, 'Ingrese un teléfono válido');
        return false;
    }
    
    return true;
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Limpiar error de campo
function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const formGroup = field.closest('.col-md-6') || field.closest('.col-12');
    const errorDiv = formGroup.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Efectos de scroll
function initScrollEffects() {
    // Navbar transparente en scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Contador animado para estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Animar contador
function animateCounter(element) {
    const originalText = element.textContent;
    let target, suffix = '';
    
    // Extraer número y sufijo correctamente
    if (originalText.includes('/7')) {
        target = parseInt(originalText.split('/')[0]);
        suffix = '/7';
    } else if (originalText.includes('+')) {
        target = parseInt(originalText.replace('+', ''));
        suffix = '+';
    } else if (originalText.includes('%')) {
        target = parseInt(originalText.replace('%', ''));
        suffix = '%';
    } else {
        target = parseInt(originalText);
    }
    
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Mantener formato original
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Utilidades adicionales
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

// Lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading si hay imágenes con data-src
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    // En producción, aquí se podría enviar el error a un servicio de monitoreo
});

// Performance monitoring
window.addEventListener('load', function() {
    // Medir tiempo de carga
    const loadTime = performance.now();
    console.log(`Página cargada en ${Math.round(loadTime)}ms`);
    
    // En producción, se podría enviar esta métrica a Google Analytics
});

// Carrusel del hero
function initHeroCarousel() {
    const carousel = document.getElementById('hero-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('#hero-prev-btn');
    const nextBtn = carousel.querySelector('#hero-next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    function showSlide(index) {
        // Ocultar todas las slides
        slides.forEach(slide => slide.classList.remove('show'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Mostrar slide actual
        slides[index].classList.add('show');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    function startAutoPlay() {
        // Increased delay between slides for a slightly slower autoplay
        autoPlayInterval = setInterval(nextSlide, 9000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners para botones
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }
    
    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // No iniciar autoplay: el carrusel se mueve solo solo si el usuario usa las flechas o los dots
}

// Exportar funciones para uso global si es necesario
window.JAMP = {
    validateContactForm,
    showFormSuccess,
    isValidPhone,
    isValidEmail,
    initHeroCarousel
};

// Theme toggle: alterna body[data-theme] = 'light' o no, y guarda preferencia en localStorage
function initThemeToggle() {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;

    // Inicializar desde localStorage
    const saved = localStorage.getItem('jamp_theme');
    if (saved === 'light') {
        document.body.setAttribute('data-theme', 'light');
    }
    updateThemeButton(btn);

    btn.addEventListener('click', function() {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('jamp_theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('jamp_theme', 'light');
        }

        updateThemeButton(btn);
    });
}

function updateThemeButton(btn) {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    const icon = btn.querySelector('i');
    if (icon) {
        // Mostrar el icono que indica la acción disponible:
        // - Si estamos en tema claro, mostrar luna (para cambiar a oscuro)
        // - Si estamos en tema oscuro, mostrar sol (para cambiar a claro)
        if (isLight) {
            icon.className = 'fas fa-moon';
            btn.title = 'Cambiar a tema oscuro';
            btn.setAttribute('aria-label', 'Cambiar a tema oscuro');
        } else {
            icon.className = 'fas fa-sun';
            btn.title = 'Cambiar a tema claro';
            btn.setAttribute('aria-label', 'Cambiar a tema claro');
        }
    }
}

// --- Reseñas: manejo local (localStorage) y renderizado dinámico ---
function initReviews() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.querySelector('.reviews-list');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('reviewName').value.trim();
            const rating = parseInt(document.getElementById('reviewRating').value, 10);
            const comment = document.getElementById('reviewComment').value.trim();

            if (!name || !comment || !rating) {
                // validación simple
                return;
            }

            const newReview = {
                id: Date.now(),
                name,
                rating,
                comment,
                date: new Date().toISOString()
            };

            // Renderizar en la página (solo en memoria, no persistente)
            prependReviewCard(newReview);

            // limpiar formulario
            reviewForm.reset();

            // Opcional: feedback al usuario
            const submitBtn = reviewForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = '¡Gracias!';
                setTimeout(() => submitBtn.textContent = 'Enviar reseña', 2000);
            }
        });
    }
}

function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';

    const content = document.createElement('div');
    content.className = 'review-content';
    const p = document.createElement('p');
    p.textContent = review.comment;
    content.appendChild(p);

    const author = document.createElement('div');
    author.className = 'review-author';
    const h5 = document.createElement('h5');
    h5.textContent = review.name;
    const span = document.createElement('span');
    span.textContent = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    author.appendChild(h5);
    author.appendChild(span);

    card.appendChild(content);
    card.appendChild(author);

    return card;
}

function prependReviewCard(review) {
    const container = document.querySelector('.reviews-list');
    if (!container) return;
    const card = createReviewCard(review);
    container.insertBefore(card, container.firstChild);
}
