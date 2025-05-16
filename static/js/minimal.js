// 当前导航项高亮
$(document).ready(function() {
    const currentPath = window.location.pathname;
    $('.minimal-nav-link').each(function() {
        if ($(this).attr('href') === currentPath) {
            $(this).addClass('minimal-nav-active');
        }
    });
});