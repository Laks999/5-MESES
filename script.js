document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const btnContinue = document.getElementById('btn-continue');
    const audio = document.getElementById('bg-music');

    // Stages
    const stage1 = document.getElementById('stage-1');
    const stage3 = document.getElementById('stage-3'); // Combined stage
    const stage4 = document.getElementById('stage-4');

    // Audio settings
    const audioStart = 96; // 1:36 in seconds
    const audioEnd = 121; // 2:01 in seconds
    let audioInterval;

    // Set volume
    audio.volume = 0.4;

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

    // Stage 1 -> Stage 3 (Open Envelope -> Combined Message/Photos/Music)
    envelope.addEventListener('click', () => {
        envelope.style.transform = 'scale(0) rotate(360deg)';
        envelope.style.opacity = '0';

        setTimeout(() => {
            switchStage(stage1, stage3);

            // Handle Audio
            audio.currentTime = audioStart;
            audio.play().catch(e => console.log("Audio play failed (interaction needed?):", e));

            // Stop audio at specific time
            audioInterval = setInterval(() => {
                if (audio.currentTime >= audioEnd) {
                    audio.pause();
                    audio.currentTime = audioStart;
                    audio.play();
                }
            }, 100);
        }, 500);
    });

    // Stage 3 -> Stage 4 (Final Message)
    btnContinue.addEventListener('click', () => {
        switchStage(stage3, stage4);
    });
});
