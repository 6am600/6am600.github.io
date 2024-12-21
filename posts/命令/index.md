# 小技巧


#### 如何一次性删除所有以某关键词结尾的文件

&gt; 其他类型删除以此类推

&lt;!--more--&gt;

```shell
find . -type f -name &#39;*.ko&#39; -exec rm -rf {} \;
```


---

> 作者:   
> URL: https://6am600.github.io/posts/%E5%91%BD%E4%BB%A4/  

