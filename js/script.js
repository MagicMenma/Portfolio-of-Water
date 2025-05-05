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
        if (header) {
            header.style.background = 'rgba(241, 231, 217, 0.7)';
        }
    }
});

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('socialButterflyYoutubeVideo', {
        height: '100%',
        width: '100%',
        videoId: 'zDGY77uq-0U',    
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

var isVideoPlaying = false;
function onPlayerStateChange(event) {
    if(event.data === YT.PlayerState.PLAYING) {
        isVideoPlaying = true;
    } else {
        isVideoPlaying = false;
    }
    console.log('Video playing status changed:', isVideoPlaying);
}

var counter = 2;

let autoSlideInterval; // 定义计时器变量

function resetAutoSlide() {
    clearInterval(autoSlideInterval); // 清除现有计时器
    autoSlideInterval = setInterval(autoSlide, 6000); // 重新启动计时器
}

function autoSlide() {
    console.log('Checking if video is playing:', isVideoPlaying);

    if (isVideoPlaying) {
        return;
    }

    for (let i = 1; i <= 5; i++) {
        const radio = document.getElementById('radio' + i);
        if (radio && radio.checked) {
            counter = parseInt(radio.id.replace('radio', ''));
            break;
        }
    }
    counter++;
    if (counter > 5) {
        counter = 1;
    }
    const nextRadio = document.getElementById('radio' + counter);
    if (nextRadio) {
        nextRadio.checked = true;
    }
}

autoSlideInterval = setInterval(autoSlide, 6000); // 初始化计时器

function changeSlide(direction) {
    const totalSlides = 5; // 总共的图片数量
    let currentSlide = 1;

    for (let i = 1; i <= totalSlides; i++) {
        const radio = document.getElementById('radio' + i);
        if (radio && radio.checked) {
            currentSlide = i;
            break;
        }
    }

    let nextSlide = currentSlide + direction;
    if (nextSlide < 1) {
        nextSlide = totalSlides;
    } else if (nextSlide > totalSlides) {
        nextSlide = 1;
    }

    const nextRadio = document.getElementById('radio' + nextSlide);
    if (nextRadio) {
        nextRadio.checked = true;
    }

    resetAutoSlide(); // 按下按钮后重置计时器
}

document.addEventListener('DOMContentLoaded', function() {
    const imgCards = document.querySelectorAll('.product-img-card');

    imgCards.forEach(function(imgCard) {
        imgCard.addEventListener('click', function() {
            const detailGallery = imgCard.closest('.detail-gallery');
            imgCard.classList.toggle('zoomed');
            detailGallery.classList.toggle('zoomed');
        });
    });
});