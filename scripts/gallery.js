function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let currentIndex = 0;
let items = [];
let totalItems = 0;
const progressBar = document.querySelector('.progress-bar');
let progressInterval;

function initializeGallery() {
    const itemsNodeList = document.querySelectorAll('.item');
    items = Array.from(itemsNodeList);
    shuffleArray(items);
    
    itemsNodeList.forEach(item => item.remove());
    
    const container = document.querySelector('.stack-container');
    const rightArrow = document.querySelector('.arrow.right');
    items.forEach(item => {
        container.insertBefore(item, rightArrow);
    });
    
    totalItems = items.length;
    
    startProgress();
    scrollContent();
}

function startProgress() {
    if (progressBar) {
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 3s linear';
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 50);
    }
    
    progressInterval = setTimeout(() => {
        scrollContent('right');
        startProgress();
    }, 3000);
}

function scrollContent(direction = null) {
    clearTimeout(progressInterval);
    
    if (direction === 'left') {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    } else if (direction === 'right') {
        currentIndex = (currentIndex + 1) % totalItems;
    }
    
    items.forEach((item, i) => {
        if (i === currentIndex) {
            item.style.transform = `translateX(0) rotateY(0deg)`;
            item.style.opacity = 1;
            item.style.zIndex = 3;
            item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.5)';
        } else if (i === ((currentIndex - 1 + totalItems) % totalItems)) {
            item.style.transform = `translateX(-40%) rotateY(-15deg) translateZ(-100px)`;
            item.style.opacity = 0.8;
            item.style.zIndex = 2;
            item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        } else if (i === ((currentIndex + 1) % totalItems)) {
            item.style.transform = `translateX(40%) rotateY(15deg) translateZ(-100px)`;
            item.style.opacity = 0.8;
            item.style.zIndex = 2;
            item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        } else {
            item.style.opacity = 0;
            item.style.zIndex = 1;
        }
    });
    
    startProgress();
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGallery);

// Make scrollContent available globally for onclick attributes
window.scrollContent = scrollContent;