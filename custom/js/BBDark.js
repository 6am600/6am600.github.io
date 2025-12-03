/**
 * 监听系统主题
 * @type {MediaQueryList}
 */
var OSTheme = window.matchMedia('(prefers-color-scheme: dark)');
OSTheme.addListener(e => {
    if (window.localStorage.getItem('ZYI_Theme_Mode') === 'Moss') {
        ThemeChange('Moss');
    }
})
/**
 * 修改博客主题
 * @param theme 亮为light,暗为dark,自动为auto
 * @constructor
 */
const ThemeChange = (theme) => {
    if (theme === 'light' || (theme === 'Moss' && !OSTheme.matches)) {
        console.log("light mode");
        document.querySelector("html").id = "ZYLight";
        document.querySelector("html").setAttribute("data-theme", "light");
        document.querySelector("#start > aside.l_left > div.leftbar-container > footer > div > a:nth-child(4)").style.filter= 'grayscale(0%)';
        document.querySelector("#start > aside.l_left > div.leftbar-container > footer > div > a:nth-child(3)").style.filter= 'grayscale(100%)';
    } else {
        // console.log("dark mode");
        document.querySelector("html").setAttribute("data-theme", "dark");
        document.querySelector("#start > aside.l_left > div.leftbar-container > footer > div > a:nth-child(3)").style.filter= 'grayscale(0%)';
        document.querySelector("#start > aside.l_left > div.leftbar-container > footer > div > a:nth-child(4)").style.filter= 'grayscale(100%)';
    }
    if (theme==='Moss'){document.querySelector("#start > aside.l_left > div.leftbar-container > footer > div > a:nth-child(5)").style.filter= 'grayscale(0%)';}
    else {document.querySelector("#start > aside.l_left > div.leftbar-container > footer > div > a:nth-child(5)").style.filter= 'grayscale(100%)';}
    window.localStorage.setItem('ZYI_Theme_Mode', theme);
}

/**
 * 初始化博客主题
 */
switch (window.localStorage.getItem('ZYI_Theme_Mode')) {
    case 'light':
        ThemeChange('light');
        break;
    case 'dark':
        ThemeChange('dark');
        break;
    default:
        ThemeChange('Moss');
}
/**
 * 切换主题模式
 */
document.querySelector("#start > aside.l_left > div.leftbar-container > footer > div > a:nth-child(3)").onclick = () => {
    console.log("dark");
    ThemeChange('dark');
}
document.querySelector("#start > aside.l_left > div.leftbar-container > footer > div > a:nth-child(4)").onclick = () => {
    console.log("light");
    ThemeChange('light');
}
document.querySelector("#start > aside.l_left > div.leftbar-container > footer > div > a:nth-child(5)").onclick = () => {
    console.log("Moss");
    ThemeChange('Moss');
}
