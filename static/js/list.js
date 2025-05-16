// 轮播图功能
let currentSlide = 0;
let autoSlideInterval;

function initCarousel() {
    const slides = document.querySelectorAll('.minimal-carousel-item');
    const totalSlides = slides.length;

    function moveSlide(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        document.querySelector('.minimal-carousel').style.transform =
            `translateX(-${currentSlide * 100}%)`;
    }

    // 自动轮播
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => moveSlide(1), 5000);
    }

    // 鼠标悬停暂停轮播
    document.querySelector('.minimal-carousel-container').addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    document.querySelector('.minimal-carousel-container').addEventListener('mouseleave', startAutoSlide);

    // 初始化
    startAutoSlide();

    // 暴露给按钮使用
    window.moveSlide = moveSlide;
}

document.addEventListener('DOMContentLoaded', initCarousel);