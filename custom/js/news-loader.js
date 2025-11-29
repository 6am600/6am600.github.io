// 文件位置: blog/source/custom/js/news-loader.js
document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;
  
    let currentNewsIndex = 0;
    let newsList = [];
  
    loadNews();
  
    async function loadNews() {
      try {
        console.log('开始加载新闻数据...');
        
        // 使用新的 JSON 文件路径
        const response = await fetch('/news-data/index.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('新闻数据加载成功，共', data.data.length, '条新闻');
        
        if (data.data && data.data.length > 0) {
          newsList = data.data;
          renderNewsContainer();
          showNews(currentNewsIndex);
        } else {
          showError('新闻数据为空');
        }
      } catch (error) {
        console.error('加载新闻失败:', error);
        showError('新闻数据加载失败: ' + error.message);
      }
    }
  
    function renderNewsContainer() {
      const containerHTML = `
        <div class="stellar-news-header">
          <h2 class="stellar-news-main-title">最新AI资讯</h2>
          <div class="stellar-news-controls">
            <span class="stellar-news-counter">${currentNewsIndex + 1} / ${newsList.length}</span>
            <button class="stellar-news-nav-btn" onclick="nextNews()">
              <span>↻</span>
            </button>
          </div>
        </div>
        <div id="news-content"></div>
      `;
      
      newsContainer.innerHTML = containerHTML;
    }
  
    function showNews(index) {
      const item = newsList[index];
      const formattedTime = formatTime(item.ctime);
      
      const titleElement = item.url ? 
        `<a href="${item.url}" target="_blank" class="stellar-news-item-title" rel="noopener noreferrer">${escapeHtml(item.title)}</a>` :
        `<span class="stellar-news-item-title">${escapeHtml(item.title)}</span>`;
      
      const newsHTML = `
        <article class="stellar-news-item">
          ${titleElement}
          
          <div class="stellar-news-meta">
            <span class="stellar-news-source">${escapeHtml(item.source)}</span>
            <span class="stellar-news-time">${formattedTime}</span>
          </div>
          
          <p class="stellar-news-description">${escapeHtml(item.description)}</p>
        </article>
      `;
      
      const counter = newsContainer.querySelector('.stellar-news-counter');
      if (counter) {
        counter.textContent = `${index + 1} / ${newsList.length}`;
      }
      
      const newsContent = document.getElementById('news-content');
      if (newsContent) {
        newsContent.innerHTML = newsHTML;
      }
    }
  
    window.nextNews = function() {
      if (newsList.length === 0) return;
      currentNewsIndex = (currentNewsIndex + 1) % newsList.length;
      showNews(currentNewsIndex);
    };
  
    function showError(message) {
      newsContainer.innerHTML = `
        <div class="news-error">
          <p>${message}</p>
          <div style="margin-top: 1rem; font-size: 0.9em; color: #666;">
            <p>请执行 <code>hexo clean && hexo generate</code> 重新生成数据</p>
          </div>
        </div>
      `;
    }
  
    function formatTime(ctime) {
      const date = new Date(ctime.replace(' ', 'T'));
      const now = new Date();
      const diff = now - date;
      
      if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        if (hours < 1) return '刚刚';
        return `${hours}小时`;
      }
      
      return date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  });