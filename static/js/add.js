document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.minimal-add-form');
    const fileInput = document.getElementById('image');
    const fileText = document.querySelector('.minimal-file-text');
    const submitBtn = document.querySelector('.minimal-submit-btn');

    // 文件选择反馈
    fileInput.addEventListener('change', function () {
        if (this.files.length > 0) {
            fileText.textContent = this.files[0].name;
        } else {
            fileText.textContent = '选择图片文件...';
        }
    });

    // 表单提交处理
    form.addEventListener('submit', function (e) {
        // 显示加载状态
        submitBtn.classList.add('loading');

        // 这里可以添加表单验证逻辑
        // 如果验证失败可以调用：
        // e.preventDefault();
        // submitBtn.classList.remove('loading');
    });

    // 标记必填字段
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        const label = form.querySelector(`label[for="${field.id}"]`);
        if (label) label.classList.add('required');
    });

    // 价格输入验证
    const priceInput = document.getElementById('price');
    if (priceInput) {
        priceInput.addEventListener('blur', function () {
            if (this.value && parseFloat(this.value) < 0) {
                this.value = 0;
            }
        });
    }
});

// 图片预览功能
const imagePreview = document.getElementById('imagePreview');
const previewImage = document.getElementById('previewImage');
const previewDefault = document.querySelector('.minimal-preview-default');

fileInput.addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function () {
            previewImage.src = this.result;
            imagePreview.classList.add('has-image');

            // 显示文件名
            fileText.textContent = file.name.length > 20
                ? file.name.substring(0, 17) + '...'
                : file.name;
        });

        reader.readAsDataURL(file);
    } else {
        previewImage.src = '';
        imagePreview.classList.remove('has-image');
        fileText.textContent = '选择图片文件...';
    }
});

// 点击预览放大图片
imagePreview.addEventListener('click', function (e) {
    if (this.classList.contains('has-image') && e.target.tagName !== 'INPUT') {
        const modal = document.createElement('div');
        modal.className = 'minimal-image-modal';
        modal.innerHTML = `
            <div class="minimal-modal-content">
                <span class="minimal-modal-close">&times;</span>
                <img src="${previewImage.src}" alt="放大预览">
            </div>
        `;

        document.body.appendChild(modal);

        // 关闭模态框
        modal.querySelector('.minimal-modal-close').addEventListener('click', function () {
            document.body.removeChild(modal);
        });

        // 点击模态框背景关闭
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
});