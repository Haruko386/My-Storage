// 页面加载后渐显
document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("fade-in");
});

// 页面离开时淡出
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");

    links.forEach(function (link) {
        const href = link.getAttribute("href");

        // 防止空链接、锚点和 JS链接影响跳转
        if (
            href &&
            !href.startsWith("#") &&
            !href.startsWith("javascript:") &&
            !link.hasAttribute("target")
        ) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                document.body.classList.remove("fade-in");
                document.body.style.opacity = 0;
                setTimeout(function () {
                    window.location = href;
                }, 300); // 与CSS中transition一致
            });
        }
    });
});

