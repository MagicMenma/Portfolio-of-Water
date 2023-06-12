// script.js
$(function() {
    $.scrollify({
    section : ".scrollPart",
    scrollbars: true,
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

var counter = 2;
setInterval(function(){
    for (var i = 1; i <= 5; i++) {
        var radio = document.getElementById('radio' + i);
        if (radio.checked) {
            counter = parseInt(radio.id.replace('radio', ''));
            break;
        }
    }
    counter++;
    if(counter > 5){
        counter = 1;
    }
    document.getElementById('radio' + counter).checked = true;
}, 6000);