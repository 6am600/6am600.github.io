document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.essay-image');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
  
    // 添加遮罩层到DOM中
    document.body.appendChild(overlay);
  
    images.forEach(function(img) {
        img.addEventListener('click', function(event) {
            img.classList.toggle('enlarged');
            overlay.style.display = 'block';
            if (!img.classList.contains('enlarged')) {
                const screenHeight = window.innerHeight * 0.8; // 获取80%的屏幕高度
                const imgHeight = img.offsetHeight; // 获取图片原始高度
                const scaleRatio = screenHeight / imgHeight; // 计算缩放比例
                
                requestAnimationFrame(() => {
                  img.style.transform = `translateX(-50%) scale(${scaleRatio})`; // 应用缩放比例
                  img.classList.add('enlarged');
                });
              } else {
                requestAnimationFrame(() => {
                  img.classList.remove('enlarged');
                  setTimeout(() => {
                    img.style.transform = 'translateX(-50%) scale(1)'; // 恢复初始状态
                  }, 500); // 等待动画结束
                });
              }
        });
      });
  
    overlay.addEventListener('click', function(event) {
      if (event.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  });