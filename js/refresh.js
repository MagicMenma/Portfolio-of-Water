﻿window.onload = function() {
    if (!localStorage.getItem('page_loaded')) {
        localStorage.setItem('page_loaded', 'true');
        location.reload();
    } else {
        localStorage.removeItem('page_loaded');
    }
};