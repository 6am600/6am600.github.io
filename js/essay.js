document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.essay-image');
    const overlay = document.createElement('div'); // 创建蒙层
    let twiceOffsetX = 0;
    let twiceOffsetY = 0;
    overlay.classList.add('overlay');
    document.body.appendChild(overlay); // 将蒙层添加到页面
  
    // 遍历所有图片
    images.forEach(image => {
        // 点击图片放大
        image.addEventListener('click', function (event) {
            event.stopPropagation(); // 阻止事件冒泡
  
            if (!image.classList.contains('zoomed')) {
                // 第一次放大：放大 2 倍
                const rect = image.getBoundingClientRect();
                const offsetX = (window.innerWidth / 2) - (rect.left + rect.width / 2);
                const offsetY = (window.innerHeight / 2) - (rect.top + rect.height / 2);
                twiceOffsetX = offsetX;
                twiceOffsetY = offsetY;
                image.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(4)`;
                image.style.zIndex = 100; // 设置最高层级
                image.classList.add('zoomed');
                overlay.classList.add('active');
            } else if (!image.classList.contains('zoomed-again')) {
                // 第二次放大：在 2 倍基础上再放大 1.5 倍
                image.style.transform = `translate(${twiceOffsetX}px, ${twiceOffsetY}px) scale(5)`;
                image.style.zIndex = 100; // 设置最高层级
                image.classList.add('zoomed-again');
            } else {
                // 恢复到初始状态
                overlay.classList.remove('active');
                image.style.zIndex = 1; // 恢复初始层级
                image.style.transform = 'translate(0, 0) scale(1)';
                image.classList.remove('zoomed', 'zoomed-again');
            }
        });
    });
  
    // 点击蒙层或屏幕任意位置缩小
    overlay.addEventListener('click', function () {
        const zoomedImage = document.querySelector('.essay-image.zoomed');
      if (zoomedImage) {
          // 恢复到初始位置
          zoomedImage.style.transform = 'translate(0, 0) scale(1)';
          zoomedImage.style.zIndex = 1; // 恢复初始层级
          zoomedImage.classList.remove('zoomed', 'zoomed-again');
      }

      // 隐藏蒙层
      overlay.classList.remove('active');
    });
  });