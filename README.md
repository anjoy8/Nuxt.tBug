
<img src="https://github.com/anjoy8/Nuxt.tBug/blob/master/assets/logoa.png" width="350"  />

      
      
      
从壹开始 [ Nuxt.js ] 之一 || 为开源收录Bug之 TiBug项目 。一个基于 Nuxt.js 提bug项目，收录有关.NetCore、DDD、Vue等相关Bug异常信息。


```
```


## 给个星星! ⭐️
如果你喜欢这个项目或者它帮助你, 请给 Star~（辛苦星咯）

*********************************************************

## 安装

```
 git clone git@github.com:anjoy8/Nuxt.tBug.git
```
安装包依赖
```
 npm install
```

## 运行
运行发开环境
```js
npm run dev
```

**本地访问http://localhost:3089**
```
可以在 package.json 中修改端口：

  "config": {
    "nuxt": {
      "host": "127.0.0.1",
      "port": "3089"
    }
  },
  
  
```


## 编译
build for production and launch server
```js
npm run build
npm start
```

## 生成
```js
npm run generate
```

## 两种部署方法

### SPA 部署

直接执行下边命令，生成 dist 文件夹，然后 nginx 代理部署即可，

这种部署仅仅是 SPA 的方法，不会有服务端渲染。

```js
npm run generate
```


### SSR 部署


先编译，然后再执行即可，这个时候会启动一个 node 服务端口监听，就类似 netcore 部署一样，
可以守护下这个进程，然后反向代码这个端口。


```js
npm run build
npm start
```



*****************************************************
### 三大平台同步直播

博客园：https://www.cnblogs.com/laozhang-is-phi/p/10236645.html

简  书：https://www.jianshu.com/notebooks/28621653

 CSDN：https://blog.csdn.net/baidu_35726140


<div class="allindex">
<h1 id="allindex">目录</h1>



<ul>
<li><a id="post_title_link_9495620" href="https://www.cnblogs.com/laozhang-is-phi/p/10236645.html">框架一 || 为开源收录Bug之 TiBug项目 开篇讲<br></a></li>
<li><a id="post_title_link_10249248" href="https://www.cnblogs.com/laozhang-is-phi/p/10249248.html">二 || 项目搭建 与 接口API</a></li>
<li><a id="post_title_link_10322040" href="https://www.cnblogs.com/laozhang-is-phi/p/10322040.html">三 || Nginx+Github+PM2 快速部署项目(一)</a></li>

</ul>


</div>



