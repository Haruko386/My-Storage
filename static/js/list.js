(function ($) {
    $.fn.timeline = function () {
        var selectors = {
            id: $(this),
            item: $(this).find(".item"),
            activeClass: "item--active",
            img: ".img"
        };
        // 将第一个时间轴项目激活，并设置时间轴背景图片为第一个项目的图片
        selectors.item.eq(0).addClass(selectors.activeClass);
        selectors.id.css(
            "background-image",
            "url(" +
            selectors.item.first()
                .find(selectors.img)
                .attr("src") +
            ")"
        );
        // 获取时间轴项目的总数
        var itemLength = selectors.item.length;
        // 当页面滚动时，触发滚动事件
        $(window).scroll(function () {
            var max, min;
            // 获取页面滚动的距离
            var pos = $(this).scrollTop();
            // 添加一个提前量，让切换在元素进入视窗前就发生
            var earlyOffset = $(window).height() * 0.35; // 视窗高度的35%作为提前量

            selectors.item.each(function (i) {
                // 获取当前时间轴项目的最小和最大高度
                min = $(this).offset().top;
                max = $(this).height() + $(this).offset().top;
                var that = $(this);

                // 如果滚动到最后一个项目，并且超过了当前项目高度的一半，
                // 则将最后一个项目设置为激活状态，并设置背景图片为最后一个项目的图片
                if (i === itemLength - 2 && pos > min + $(this).height() / 2) {
                    selectors.item.removeClass(selectors.activeClass);
                    selectors.id.css(
                        "background-image",
                        "url(" +
                        selectors.item.last()
                            .find(selectors.img)
                            .attr("src") +
                        ")"
                    );
                    selectors.item.last().addClass(selectors.activeClass);
                }
                // 修改条件：当滚动位置接近元素顶部（提前earlyOffset像素）时就切换
                else if (pos <= max - 10 && pos >= min - earlyOffset) {
                    selectors.id.css(
                        "background-image",
                        "url(" +
                        $(this)
                            .find(selectors.img)
                            .attr("src") +
                        ")"
                    );
                    selectors.item.removeClass(selectors.activeClass);
                    $(this).addClass(selectors.activeClass);
                }
            });
        });
    };
})(jQuery);

$("#shell").timeline();

document.addEventListener('DOMContentLoaded', function () {
    const floatingButton = document.getElementById('floatingButton');
    const floatingMenu = document.getElementById('floatingMenu');
    const floatingIcon = floatingButton.querySelector('.floating-icon');

    let isMenuOpen = false;

    floatingButton.addEventListener('click', function () {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            floatingMenu.classList.add('active');
            floatingIcon.textContent = '✕'; // 或者使用 ↑
            floatingIcon.style.transform = 'rotate(90deg)';
        } else {
            floatingMenu.classList.remove('active');
            floatingIcon.textContent = '☰';
            floatingIcon.style.transform = 'rotate(0)';
        }
    });

    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function (e) {
        if (!floatingButton.contains(e.target) && !floatingMenu.contains(e.target)) {
            floatingMenu.classList.remove('active');
            floatingIcon.textContent = '☰';
            floatingIcon.style.transform = 'rotate(0)';
            isMenuOpen = false;
        }
    });
});