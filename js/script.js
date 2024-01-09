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
setInterval(function(){
    console.log('Checking if video is playing:', isVideoPlaying);
    
    if(isVideoPlaying) {
        return;
    }

    for (var i = 1; i <= 5; i++) {
        var radio = document.getElementById('radio' + i);
        if (radio && radio.checked) {
            counter = parseInt(radio.id.replace('radio', ''));
            break;
        }
    }
    counter++;
    if(counter > 5){
        counter = 1;
    }
    var nextRadio = document.getElementById('radio' + counter);
    if (nextRadio) {
        nextRadio.checked = true;
    }
}, 6000);
