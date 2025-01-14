# 博客 - 美化


&lt;!--more--&gt;

## 给你的主页添加GIT动态贪吃蛇

参考 [动态贪吃蛇特效Github地址](https://github.com/Platane/snk)

在仓库 .github/workflows（没有就新建一个）下的static.yml中添加如下git action：

```yml
generate:
    permissions: 
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 5
    
    steps:
      # generates a snake game from a github user (&lt;github_user_name&gt;) contributions graph, output a svg animation at &lt;svg_out_path&gt;
      - name: generate github-contribution-grid-snake.svg
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
          
          
      # push the content of &lt;build_dir&gt; to a branch
      # the content will be available at https://raw.githubusercontent.com/&lt;github_user&gt;/&lt;repository&gt;/&lt;target_branch&gt;/&lt;file&gt; , or as github page
      - name: push github-contribution-grid-snake.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

这个操作会生成一个svg，并放到https://raw.githubusercontent.com中

昨晚修改，将代码提交到仓库上，git会自动识别action并执行，之后就可以获取到自己的动态贪吃蛇svg了

按照格式：https://raw.githubusercontent.com/&lt;github_user&gt;/&lt;repository&gt;/&lt;target_branch&gt;/&lt;file&gt;

比如我的：https://raw.githubusercontent.com/6am600/6am600.github.io/output/github-contribution-grid-snake.svg

得到svg了，现在只需要把这个svg设置为头像后的背景就行了

在assets/css文件夹下新建一个custome.css，添加如下代码：

```css
/* 设置git提交贪吃蛇 */
.home-profile {
    background-image: url(https://raw.githubusercontent.com/6am600/6am600.github.io/output/github-contribution-grid-snake.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
/* 设置头像大小 */
.home .home-profile .home-avatar img  {
    width: 150px;
    height: 150px;
}
```

然后在项目配置文件中引入（我的主题是Fixit，其他主题也有对应的css添加方式，自己找一下）：

```toml
[params.page.library]
      [params.page.library.css]
        custom = &#34;/css/custom.css&#34;
```

然后执行hugo，将代码提交就好了 .

















---

> 作者: [扳布](https://6am600.github.io)  
> URL: https://6am600.github.io/posts/%E7%BE%8E%E5%8C%96/  

