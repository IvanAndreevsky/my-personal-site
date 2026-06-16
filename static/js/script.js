// ===== ВОЗРАСТ (автоматический подсчёт) =====
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

document.addEventListener('DOMContentLoaded', function() {
    const birthDateStr = '2004-04-22';
    const age = calculateAge(birthDateStr);
    const ageElement = document.getElementById('ageValue');
    if (ageElement) {
        ageElement.textContent = `${age} лет`;
    }
});

// ===== ПРЕЛОАДЕР (скрывается после полной загрузки) =====
window.onload = function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hide-preloader');
    }
};

// ===== ПЕРЕКЛЮЧЕНИЕ ФОТО (каждые 4 секунды) =====
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.photo-slider .slide');
    if (slides.length > 0) {
        let currentIndex = 0;
        
        function showNextSlide() {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }
        
        setInterval(showNextSlide, 4000);
    }
});

// ===== СЛАЙДЕР ДЛЯ КОНКУРСА БАРМЕНОВ =====
document.addEventListener('DOMContentLoaded', function() {
    const barSlides = document.querySelectorAll('.bar-slide');
    const prevBtn = document.querySelector('.bar-prev');
    const nextBtn = document.querySelector('.bar-next');
    const counter = document.querySelector('.bar-counter');
    
    if (barSlides.length > 0 && prevBtn && nextBtn) {
        let currentBarIndex = 0;
        
        function updateBarSlider() {
            barSlides.forEach((slide, idx) => {
                slide.classList.toggle('active', idx === currentBarIndex);
            });
            if (counter) {
                counter.textContent = `${currentBarIndex + 1} / ${barSlides.length}`;
            }
        }
        
        function nextBarSlide() {
            currentBarIndex = (currentBarIndex + 1) % barSlides.length;
            updateBarSlider();
        }
        
        function prevBarSlide() {
            currentBarIndex = (currentBarIndex - 1 + barSlides.length) % barSlides.length;
            updateBarSlider();
        }
        
        nextBtn.addEventListener('click', nextBarSlide);
        prevBtn.addEventListener('click', prevBarSlide);
        
        setInterval(nextBarSlide, 5000);
        
        updateBarSlider();
    }
});

// ===== БУРГЕР-МЕНЮ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ =====
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }
});

// ===== ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК =====
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                const nav = document.querySelector('nav');
                const burger = document.querySelector('.burger');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (burger) burger.classList.remove('active');
                }
            }
        });
    });
});

// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ =====
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.about-card, .hobby-item, .achievement-card, .place-content, .bar-slider-container');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const triggerBottom = windowHeight * 0.85;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    checkIfInView();
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);
});

// ===== МОДАЛЬНОЕ ОКНО С ФОРМОЙ ОБРАТНОЙ СВЯЗИ =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('feedbackModal');
    const openBtn = document.getElementById('openFormBtn');
    const closeBtn = document.querySelector('.closeModal');
    const form = document.getElementById('feedbackForm');
    const formMessage = document.getElementById('formMessage');
    
    // ОТКРЫТИЕ
    if (openBtn && modal) {
        openBtn.addEventListener('click', function() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // ЗАКРЫТИЕ ПО КРЕСТИКУ
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            if (formMessage) {
                formMessage.className = 'form-message';
                formMessage.innerHTML = '';
            }
        });
    }
    
    // ЗАКРЫТИЕ ПО КЛИКУ ВНЕ ОКНА
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                if (formMessage) {
                    formMessage.className = 'form-message';
                    formMessage.innerHTML = '';
                }
            }
        });
    }
    
    // ОТПРАВКА ФОРМЫ
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            let data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Проверка обязательных полей
            if (!data.fio || !data.email || !data.subject || !data.message) {
                if (formMessage) {
                    formMessage.className = 'form-message error';
                    formMessage.innerHTML = 'Пожалуйста, заполните все обязательные поля (отмечены *)';
                }
                return;
            }
            
            // Проверка email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                if (formMessage) {
                    formMessage.className = 'form-message error';
                    formMessage.innerHTML = 'Введите корректный email адрес';
                }
                return;
            }
            
            // Успешная отправка
            if (formMessage) {
                formMessage.className = 'form-message success';
                formMessage.innerHTML = 'Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.';
                form.reset();
            }
            
            // Через 3 секунды закрыть окно
            setTimeout(function() {
                if (modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = '';
                }
                if (formMessage) {
                    formMessage.className = 'form-message';
                    formMessage.innerHTML = '';
                }
            }, 3000);
        });
    }
});