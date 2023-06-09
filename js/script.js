// script.js
$(function() {
    $.scrollify({
    section : ".scrollPart",
    scrollbars: false,
    setHeights: false,
    });
});

 window.addEventListener('scroll', function() {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        var header = document.querySelector('.header_section');
        if (header) {
            header.style.background = 'rgba(241, 231, 217, 1)';
        }
    } else {
        header = document.querySelector('.header_section');
        header.style.background = 'rgba(241, 231, 217, 0.7)';
    }
});