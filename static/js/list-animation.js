document.addEventListener('DOMContentLoaded', function() {
    // 观察产品项的交互动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // 为每个产品项添加观察
    document.querySelectorAll('.minimal-product-item').forEach(item => {
        // 初始状态
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });

    // 随机调整布局顺序 (可选)
    const items = document.querySelectorAll('.minimal-product-item');
    items.forEach((item, index) => {
        if (Math.random() > 0.5) {
            item.classList.toggle('left-layout');
            item.classList.toggle('right-layout');
        }
        // 随机动画延迟
        item.style.animationDelay = `${index * 0.1 + Math.random() * 0.2}s`;
    });
});