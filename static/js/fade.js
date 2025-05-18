// 页面淡入函数
function fadeIn() {
    document.body.style.opacity = 1;
}

// 页面加载完成（首次进入）
document.addEventListener("DOMContentLoaded", function () {
    fadeIn(); // 执行淡入动画

    const links = document.querySelectorAll("a");

    links.forEach(function (link) {
        const href = link.getAttribute("href");

        // 排除锚点、JS链接、新标签页等情况
        if (
            href &&
            !href.startsWith("#") &&
            !href.startsWith("javascript:") &&
            !link.hasAttribute("target")
        ) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                document.body.style.opacity = 0;
                setTimeout(function () {
                    window.location = href;
                }, 300); // 与 transition 时间一致
            });
        }
    });
});

// 处理浏览器返回时的淡入（如后退按钮）
window.addEventListener("pageshow", function (event) {
    // 如果是从 bfcache 恢复，则需要手动淡入
    if (event.persisted) {
        fadeIn();
    }
});
