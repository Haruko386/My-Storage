// 产品详情页交互
document.addEventListener('DOMContentLoaded', function() {
    // 图片放大预览功能
    const mainImage = document.querySelector('.minimal-main-image img');
    if (mainImage) {
        mainImage.addEventListener('click', function() {
            this.classList.toggle('minimal-zoomed');
        });
    }

    // 购买数量控制
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.value = '1';
    quantityInput.className = 'minimal-quantity';
    document.querySelector('.minimal-actions').prepend(quantityInput);
});