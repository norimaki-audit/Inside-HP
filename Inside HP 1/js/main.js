// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // モバイルメニューを閉じる
            const nav = document.querySelector('.nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});

// ========================================
// Header Scroll Effect
// ========================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Active Navigation
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const headerHeight = header.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // アイコン切り替え
    const icon = mobileToggle.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ========================================
// Scroll to Top Button
// ========================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Scroll Animation
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素
const animateElements = document.querySelectorAll('.service-card, .expertise-item, .feature-item, .info-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ========================================
// Contact Form
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // フォームデータ取得
        const formData = {
            name: document.getElementById('name').value,
            company: document.getElementById('company').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // バリデーション
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('必須項目を入力してください。');
            return;
        }
        
        // メールアドレス形式チェック
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            alert('正しいメールアドレスを入力してください。');
            return;
        }
        
        // ここで実際の送信処理を実装
        console.log('フォームデータ:', formData);
        
        alert('お問い合わせありがとうございます。\n内容を確認次第、ご連絡させていただきます。');
        contactForm.reset();
    });
}

// ========================================
// Parallax Effect (Hero Section)
// ========================================
const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
        }
    });
}

// ========================================
// Loading Animation
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// モバイルメニューのスタイル追加
// ========================================
if (window.innerWidth <= 768) {
    const style = document.createElement('style');
    style.textContent = `
        .nav {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 80%;
            max-width: 300px;
            height: calc(100vh - 70px);
            background: rgba(1, 42, 82, 0.98);
            backdrop-filter: blur(10px);
            transition: right 0.3s ease;
            z-index: 999;
            padding: 30px;
        }
        
        .nav.active {
            right: 0;
        }
        
        .nav-list {
            flex-direction: column;
            gap: 25px;
        }
        
        .nav-link {
            font-size: 18px;
        }
    `;
    document.head.appendChild(style);
}

console.log('株式会社inside - Website Loaded Successfully! 🎉');
