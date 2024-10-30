class FallingBackground {
    constructor(options = {}) {
        // Default options
        this.options = {
            imageSrc: options.imageSrc || '',
            containerID: options.containerID || 'falling-background',
            numberOfImages: options.numberOfImages || 10,
            imageSize: options.imageSize || 100,
            minDuration: options.minDuration || 5,
            maxDuration: options.maxDuration || 8,
            opacity: options.opacity || 0.5,
            rotate: options.rotate || true
        };

        this.init();
    }

    init() {
        // Create or get container
        this.container = document.getElementById(this.options.containerID);
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = this.options.containerID;
            document.body.appendChild(this.container);
        }

        // Style container
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            pointer-events: none;
        `;

        // Create falling images
        this.createImages();
    }

    createImages() {
        for (let i = 0; i < this.options.numberOfImages; i++) {
            this.createSingleImage();
        }
    }

    createSingleImage() {
        const img = document.createElement('img');
        img.src = this.options.imageSrc;
        
        // Style the image
        img.style.cssText = `
            position: absolute;
            width: ${this.options.imageSize}px;
            height: ${this.options.imageSize}px;
            opacity: ${this.options.opacity};
            object-fit: contain;
            left: ${Math.random() * 100}%;
            transform: translateY(-100%);
        `;

        // Create and apply animation
        const duration = this.options.minDuration + Math.random() * 
            (this.options.maxDuration - this.options.minDuration);
        const delay = Math.random() * 5; // Random delay up to 5 seconds
        const rotation = this.options.rotate ? 360 : 0;

        img.style.animation = `falling ${duration}s linear ${delay}s infinite`;

        // Add keyframe animation if it doesn't exist
        if (!document.querySelector('#falling-keyframes')) {
            const keyframes = document.createElement('style');
            keyframes.id = 'falling-keyframes';
            keyframes.textContent = `
                @keyframes falling {
                    0% {
                        transform: translateY(-100%) rotate(0deg);
                    }
                    100% {
                        transform: translateY(100vh) rotate(${rotation}deg);
                    }
                }
            `;
            document.head.appendChild(keyframes);
        }

        this.container.appendChild(img);
    }

    // Method to change the image source
    changeImage(newSrc) {
        this.options.imageSrc = newSrc;
        this.container.innerHTML = '';
        this.createImages();
    }

    // Method to update number of images
    updateImageCount(count) {
        this.options.numberOfImages = count;
        this.container.innerHTML = '';
        this.createImages();
    }

    // Method to update fall speed
    updateSpeed(minDuration, maxDuration) {
        this.options.minDuration = minDuration;
        this.options.maxDuration = maxDuration;
        this.container.innerHTML = '';
        this.createImages();
    }

    // Method to update opacity
    updateOpacity(opacity) {
        this.options.opacity = opacity;
        this.container.innerHTML = '';
        this.createImages();
    }
}