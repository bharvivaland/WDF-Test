// Video Controls
const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPause');
const stopBtn = document.getElementById('stop');
const fullscreenBtn = document.getElementById('fullscreen');
const volumeSlider = document.getElementById('volume');
const playbackSpeed = document.getElementById('playbackSpeed');
const progressBarContainer = document.querySelector('.progress-container');
const progressBar = document.getElementById('progressBar');

// For Play & Pause
playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        video.pause();
        playPauseBtn.textContent = 'Play';
    }
});

// Stop
stopBtn.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0;
    playPauseBtn.textContent = 'Play';
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
});

// Volume Control
volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
});

// Change Playback Speed
playbackSpeed.addEventListener('change', () => {
    video.playbackRate = playbackSpeed.value;
});

// Update Progress Bar
video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

// Seek in Video
progressBarContainer.addEventListener('click', (e) => {
    const containerWidth = progressBarContainer.offsetWidth;
    const clickX = e.offsetX;
    const newTime = (clickX / containerWidth) * video.duration;
    video.currentTime = newTime;
});


