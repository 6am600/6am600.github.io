// 文件位置: blog/source/custom/js/travel-map.js
// 旅行足迹地图功能

document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('travel-map-container');
    if (!mapContainer) return;

    let mapData = {
        map_config: {},
        locations: []
    };

    // 检查 Fancybox 状态
    const checkFancybox = () => {
        if (typeof Fancybox !== 'undefined') {
            console.log('✅ Fancybox 已加载');
            return true;
        } else {
            console.warn('⚠️ Fancybox 未加载，图片点击将使用默认行为');
            return false;
        }
    };

    // 延迟检查，确保所有脚本加载完成
    setTimeout(() => {
        checkFancybox();
    }, 500);

    // 开始加载
    loadTravelData();

    /**
     * 加载旅行数据
     */
    async function loadTravelData() {
        try {
            // console.log('开始加载旅行数据...');

            const response = await fetch('/travel-locations.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // console.log('旅行数据加载成功，共', data.locations.length, '个地点');

            mapData = data;

            // 等待高德地图 API 加载完成
            waitForAMap().then(() => {
                initMap();
                updateStatistics();
            }).catch((error) => {
                console.error('高德地图 API 加载失败:', error);
                showError('地图 API 加载失败，请检查网络连接');
            });

        } catch (error) {
            console.error('加载旅行数据失败:', error);
            showError('旅行数据加载失败: ' + error.message);
        }
    }

    /**
     * 等待高德地图 API 加载完成
     */
    function waitForAMap() {
        return new Promise((resolve, reject) => {
            const checkInterval = setInterval(() => {
                if (typeof AMap !== 'undefined') {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);

            // 10秒超时
            setTimeout(() => {
                clearInterval(checkInterval);
                reject(new Error('高德地图 API 加载超时'));
            }, 10000);
        });
    }

    /**
     * 初始化地图
     */
    function initMap() {
        // 清空加载状态
        mapContainer.innerHTML = '<div id="travel-map"></div>';

        // 创建地图实例
        const map = new AMap.Map('travel-map', {
            zoom: mapData.map_config.zoom || 5,
            center: [
                mapData.map_config.center.lng,
                mapData.map_config.center.lat
            ],
            mapStyle: 'amap://styles/normal',
            viewMode: '2D',
            pitch: 0
        });

        // 添加标记点
        addMarkers(map);

        // 添加地图控件
        addMapControls(map);

        // 自动调整视野
        setTimeout(() => {
            map.setFitView();
        }, 500);
    }

    /**
     * 添加标记点
     */
    function addMarkers(map) {
        if (!mapData.locations || mapData.locations.length === 0) {
            console.warn('没有地点数据');
            return;
        }

        const markers = [];

        mapData.locations.forEach(location => {
            // 创建标记
            const marker = new AMap.Marker({
                position: [location.lng, location.lat],
                title: location.name,
                animation: 'AMAP_ANIMATION_DROP'
            });

            // 创建信息窗口
            const infoWindow = createInfoWindow(location);

            // 点击事件
            marker.on('click', function() {
                infoWindow.open(map, marker.getPosition());

                // 信息窗口打开后，重新绑定 Fancybox
                setTimeout(() => {
                    const images = document.querySelectorAll('[data-fancybox="travel-map"]');

                    if (images.length > 0 && typeof Fancybox !== 'undefined') {
                        // 先解绑之前的，避免重复绑定
                        Fancybox.unbind('[data-fancybox="travel-map"]');
                        // 重新绑定
                        Fancybox.bind('[data-fancybox="travel-map"]', {
                            hideScrollbar: false,
                            Thumbs: {
                                autoStart: false,
                            },
                            caption: (fancybox, slide) => {
                                const alt = slide.triggerEl.alt || slide.triggerEl.dataset.caption || '';
                                return alt;
                            }
                        });
                        console.log('✅ Fancybox 已绑定到', images.length, '张图片');
                    } else if (images.length > 0) {
                        console.warn('⚠️ 找到', images.length, '张图片，但 Fancybox 未加载');
                    } else {
                        console.log('ℹ️ 信息窗口中没有图片');
                    }
                }, 300);
            });

            markers.push(marker);
        });

        // 添加到地图
        map.add(markers);
    }

    /**
     * 创建信息窗口
     */
    function createInfoWindow(location) {
        const content = `
            <div class="amap-info-content">
                <h3>${escapeHtml(location.name)}</h3>
                ${location.date ? `
                    <p class="location-date">
                        <span class="location-icon">📅</span>
                        ${formatDate(location.date)}
                    </p>
                ` : ''}
                ${location.category ? `
                    <p class="location-category">
                        <span class="location-icon">🏷️</span>
                        ${escapeHtml(location.category)}
                    </p>
                ` : ''}
                ${location.description ? `
                    <p class="location-description">
                        ${escapeHtml(location.description)}
                    </p>
                ` : ''}
                ${location.images && location.images.length > 0 ? `
                    <div class="location-images">
                        ${location.images.map(img => `
                            <a data-fancybox="travel-map" href="${img}" data-caption="${escapeHtml(location.name)}">
                                <img src="${img}"
                                     alt="${escapeHtml(location.name)}"
                                     onerror="this.parentElement.style.display='none'">
                            </a>
                        `).join('')}
                    </div>
                ` : ''}
                ${location.tags && location.tags.length > 0 ? `
                    <div class="location-tags">
                        ${location.tags.map(tag => `
                            <span class="tag">${escapeHtml(tag)}</span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        return new AMap.InfoWindow({
            content: content,
            offset: new AMap.Pixel(0, -30)
        });
    }

    /**
     * 添加地图控件
     */
    function addMapControls(map) {
        // 高德地图 API 2.0 控件需要通过插件加载
        // 暂时禁用控件以避免兼容性问题
        // 如果需要控件，请在 API URL 中添加 plugin=AMap.ToolBar,AMap.Scale
    }

    /**
     * 更新统计信息
     */
    function updateStatistics() {
        const totalLocationsEl = document.getElementById('total-locations');
        const totalCountriesEl = document.getElementById('total-countries');
        const lastUpdateEl = document.getElementById('last-update');

        if (totalLocationsEl) {
            totalLocationsEl.textContent = mapData.locations.length || 0;
        }

        if (totalCountriesEl) {
            // 计算不同城市数量
            const cities = new Set();
            mapData.locations.forEach(loc => {
                if (loc.tags && loc.tags.length > 0) {
                    // 使用最后一个标签作为城市
                    cities.add(loc.tags[loc.tags.length - 1]);
                }
            });
            totalCountriesEl.textContent = cities.size || 0;
        }

        if (lastUpdateEl && mapData.updated) {
            const date = new Date(mapData.updated);
            lastUpdateEl.textContent = date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }

    /**
     * 格式化日期
     */
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * HTML 转义
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * 显示错误信息
     */
    function showError(message) {
        mapContainer.innerHTML = `
            <div class="travel-map-error">
                <p>❌ ${message}</p>
                <div class="error-hint">
                    <p>请检查：</p>
                    <p>1. 数据文件是否存在</p>
                    <p>2. 高德地图 API Key 是否正确</p>
                    <p>3. 执行 <code>hexo clean && hexo generate</code> 重新生成</p>
                </div>
            </div>
        `;
    }
});
