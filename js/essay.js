// script.js
document.addEventListener('DOMContentLoaded', () => {
    const essayImage = document.querySelector('.essay-image');
    const lightbox = document.querySelector('.lightbox');
    const imageZoom = document.querySelector('.essay-image-zoom');

    // 点击按钮时显示图片
    essayImage.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        imageZoom.style.display = 'block';
    });

    // 点击外部区域时关闭图片
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
            mageZoom.style.display = 'none';
        }
    });
});