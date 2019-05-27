// ==UserScript==
// @name         Always video progress bar on ani.gamer.com.tw
// @namespace    https://wiki.gslin.org/wiki/Always_video_progress_bar_on_ani.gamer.com.tw
// @version      0.20190527.0
// @description  Enable progress bar on ani.gamer.com.tw
// @author       Gea-Suan Lin <darkkiller@gmail.com>
// @match        https://ani.gamer.com.tw/animeVideo.php*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    let loadbar = document.createElement('div');
    loadbar.style = 'background: #00b4d8; display: block; height: 5px; margin: 0; padding:0; width: 100%;';

    let vf = document.querySelector('.videoframe');

    let ob1 = new window.MutationObserver(() => {
        let v = vf.querySelector('#ani_video_html5_api');
        if (!v) {
            return;
        }

        vf.insertBefore(loadbar, vf.querySelector('.bullet-send'));

        v.addEventListener('timeupdate', () => {
            loadbar.style.width = (100 * v.currentTime / v.duration) + '%';
        });

        ob1.disconnect();
    });
    ob1.observe(vf, {
        childList: true,
        subtree: true,
    });

    let ob2 = new window.MutationObserver(() => {
        let vjs = document.querySelector('video-js');
        if (!vjs) {
            return;
        }

        if (vjs.classList.contains('vjs-playing') && vjs.classList.contains('vjs-user-inactive')) {
            loadbar.style.display = 'block';
        } else {
            loadbar.style.display = 'none';
        }
    });
    ob2.observe(vf, {
        childList: true,
        subtree: true,
    });
})();
