document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle Functionality
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const footer = document.querySelector('footer');
    const menuOverlay = document.getElementById('menu-overlay');
    let isMenuOpen = false;

    function openMenu() {
        sidebar.classList.add('expanded');
        menuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        isMenuOpen = true;
    }
    function closeMenu() {
        sidebar.classList.remove('expanded');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        isMenuOpen = false;
    }
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenu);
    // Optional: close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (isMenuOpen && (e.key === 'Escape' || e.key === 'Esc')) {
            closeMenu();
        }
    });

    // Randomize Music Grid
    function randomizeMusicGrid() {
        const musicGrid = document.querySelector('.music-grid');
        const musicItems = Array.from(musicGrid.children);
        
        // Fisher-Yates shuffle algorithm
        for (let i = musicItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            musicGrid.appendChild(musicItems[j]);
        }
    }

    // Call randomize function when page loads
    randomizeMusicGrid();

    // Add shuffle button to header
    const header = document.querySelector('header');
    const shuffleButton = document.createElement('button');
    shuffleButton.className = 'shuffle-button';
    shuffleButton.innerHTML = '<i class="fas fa-random"></i>';
    shuffleButton.title = 'Shuffle Music Grid';
    header.insertBefore(shuffleButton, document.querySelector('.search-bar'));

    // Add click event to shuffle button
    shuffleButton.addEventListener('click', randomizeMusicGrid);

    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progressBar = document.querySelector('.progress');
    const progressFilled = document.querySelector('.progress-filled');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const volumeControl = document.getElementById('volume');
    const currentAlbum = document.getElementById('current-album');
    const currentTitle = document.getElementById('current-title');
    const currentArtist = document.getElementById('current-artist');
    const musicItems = document.querySelectorAll('.music-item');

    let currentTrackIndex = 0;
    let isPlaying = false;

    // Format time in seconds to MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Update progress bar
    function updateProgress() {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFilled.style.width = `${percent}%`;
        currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
    }

    // Update duration
    function updateDuration() {
        durationSpan.textContent = formatTime(audioPlayer.duration);
    }

    // Play/Pause toggle
    function togglePlay() {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    // Load and play track
    function loadTrack(index) {
        const track = musicItems[index];
        const src = track.dataset.src;
        const title = track.querySelector('h3').textContent;
        const artist = track.querySelector('p').textContent;
        const albumArt = track.querySelector('img').src;

        audioPlayer.src = src;
        currentTitle.textContent = title;
        currentArtist.textContent = artist;
        currentAlbum.src = albumArt;

        if (isPlaying) {
            audioPlayer.play();
        }
    }

    // Event Listeners
    playPauseBtn.addEventListener('click', togglePlay);

    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + musicItems.length) % musicItems.length;
        loadTrack(currentTrackIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % musicItems.length;
        loadTrack(currentTrackIndex);
    });

    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
    audioPlayer.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % musicItems.length;
        loadTrack(currentTrackIndex);
    });

    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
    });

    progressBar.addEventListener('click', (e) => {
        const percent = (e.offsetX / progressBar.offsetWidth);
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });

    // Add click event to music items
    musicItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            if (!isPlaying) {
                togglePlay();
            }
        });
    });

    // Initialize volume
    audioPlayer.volume = volumeControl.value / 100;
}); 