document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const btnNext = document.getElementById('btn-next');
    const btnContinue = document.getElementById('btn-continue');
    const audio = document.getElementById('bg-music');

    // Stages
    const stage1 = document.getElementById('stage-1');
    const stage2 = document.getElementById('stage-2');
    const stage3 = document.getElementById('stage-3');
    const stage4 = document.getElementById('stage-4');

    // Audio settings
    const audioStart = 96; // 1:36 in seconds
    const audioEnd = 121; // 2:01 in seconds
    let audioInterval;

    // Transition function
    function switchStage(current, next) {
        current.classList.remove('active');
        setTimeout(() => {
            current.style.display = 'none';
            next.style.display = 'flex';
            // Trigger reflow
            void next.offsetWidth;
            next.classList.add('active');
        }, 1000); // Wait for opacity transition
    }

    // Stage 1 -> Stage 2 (Open Envelope)
    envelope.addEventListener('click', () => {
        envelope.style.transform = 'scale(0) rotate(360deg)';
        envelope.style.opacity = '0';
        
        setTimeout(() => {
            switchStage(stage1, stage2);
        }, 500);
    });

    // Stage 2 -> Stage 3 (Play Music & Show Photos)
    btnNext.addEventListener('click', () => {
        switchStage(stage2, stage3);
        
        // Handle Audio
        audio.currentTime = audioStart;
        audio.play().catch(e => console.log("Audio play failed (interaction needed?):", e));
        
        // Stop audio at specific time
        audioInterval = setInterval(() => {
            if (audio.currentTime >= audioEnd) {
                audio.pause();
                audio.currentTime = audioStart; // Reset or loop? User didn't specify loop, just "play from X to Y"
                // Maybe loop it? "sonando la cancion... en el minuto 1:36 al 2:01" implies this segment.
                // Let's loop this segment for better effect while they look at photos
                audio.play(); 
            }
        }, 100);
    });

    // Stage 3 -> Stage 4 (Final Message)
    btnContinue.addEventListener('click', () => {
        switchStage(stage3, stage4);
        // Optional: Stop music or keep playing? User didn't specify.
        // Let's keep playing for ambiance or fade out.
        // I'll leave it playing.
    });
});
