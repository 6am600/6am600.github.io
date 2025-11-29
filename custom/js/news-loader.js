document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;
  
    // 你的新闻API地址
    const apiUrl = 'https://apis.tianapi.com/ai/index?key=a52ed92ccc8e42ea07796f1e8f870640&num=10';
    
    loadNews();
  
    async function loadNews() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.code === 200 && data.result?.newslist) {
          renderNews(data.result.newslist);
        } else {
          showError('暂无新闻数据');
        }
      } catch (error) {
        console.error('获取新闻数据失败:', error);
        showError('加载新闻失败，请稍后重试');
      }
    }
  
    function renderNews(newslist) {
      const newsHTML = newslist.map(item => {
        const formattedTime = formatTime(item.ctime);
        
        // 如果有链接，标题做成可点击的
        const titleElement = item.url ? 
          `<a href="${item.url}" target="_blank" class="stellar-news-title" rel="noopener noreferrer">${escapeHtml(item.title)}</a>` :
          `<span class="stellar-news-title">${escapeHtml(item.title)}</span>`;
        
        return `
          <article class="stellar-news-item">
            ${titleElement}
            
            <div class="stellar-news-meta">
              <span class="stellar-news-source">${escapeHtml(item.source)}</span>
              <span class="stellar-news-time">${formattedTime}</span>
            </div>
            
            <p class="stellar-news-description">${escapeHtml(item.description)}</p>
          </article>
        `;
      }).join('');
      
      newsContainer.innerHTML = newsHTML;
    }
  
    function showError(message) {
      newsContainer.innerHTML = `
        <div class="news-error">
          <p>${message}</p>
          <button onclick="location.reload()" style="
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: #1890ff;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          ">重新加载</button>
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
        return `${hours}小时前`;
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