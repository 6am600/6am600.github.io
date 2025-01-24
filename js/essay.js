document.addEventListener('DOMContentLoaded', function() {
    const image = document.querySelector('.essay-image');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
  
    // 添加遮罩层到DOM中
    document.body.appendChild(overlay);
  
    image.addEventListener('click', function() {
      image.classList.toggle('enlarged');
      overlay.style.display = 'block';
    });
  
    overlay.addEventListener('click', function(event) {
      if (event.target === overlay) { // 确保点击的是遮罩层本身而不是图片
        image.classList.remove('enlarged');
        overlay.style.display = 'none';
      }
    });
  });