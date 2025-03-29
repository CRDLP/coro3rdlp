document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    const itemCount = items.length;
    
    // Set initial carousel width
    carousel.style.width = `${itemCount * 100}%`;
    items.forEach(item => {
        item.style.width = `${100 / itemCount}%`;
    });
    
    function goToSlide(index) {
        if (index < 0) {
            currentIndex = itemCount - 1;
        } else if (index >= itemCount) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        carousel.style.transform = `translateX(-${currentIndex * (100 / itemCount)}%)`;
    }
    
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // Auto-slide
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // Songbook functionality
    const songs = document.querySelectorAll('.song');
    const audioPlayer = document.getElementById('audio-player');
    let currentlyPlaying = null;
    
    songs.forEach(song => {
        // Handle play button
        const playBtn = song.querySelector('.play-btn');
        playBtn.addEventListener('click', () => {
            const audioSrc = song.getAttribute('data-audio');
            
            if (currentlyPlaying === song) {
                // Toggle play/pause if the same song
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    playBtn.textContent = '⏸️';
                } else {
                    audioPlayer.pause();
                    playBtn.textContent = '▶️';
                }
            } else {
                // Reset any previously playing song
                if (currentlyPlaying) {
                    currentlyPlaying.querySelector('.play-btn').textContent = '▶️';
                }
                
                // Play new song
                audioPlayer.src = audioSrc;
                audioPlayer.play();
                playBtn.textContent = '⏸️';
                currentlyPlaying = song;
                
                // Reset when song ends
                audioPlayer.onended = () => {
                    playBtn.textContent = '▶️';
                    currentlyPlaying = null;
                };
            }
        });
        
        // Handle lyrics toggle
        const lyricsBtn = song.querySelector('.lyrics-btn');
        const lyrics = song.querySelector('.lyrics');
        
        lyricsBtn.addEventListener('click', () => {
            if (lyrics.classList.contains('hidden')) {
                lyrics.classList.remove('hidden');
                lyricsBtn.textContent = 'Ocultar letra';
            } else {
                lyrics.classList.add('hidden');
                lyricsBtn.textContent = 'Ver letra';
            }
        });
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
});
