<template>
  <div id="articlesDetails" class="fadein">
    <div class="detail-header">
      <h1>{{articleDetails.title}}</h1>
      <div class="time">
        {{new Date(articleDetails.date).format('yyyy-MM-dd')}}
      </div>
      <div class="detail-body-tag">
        <span v-for="list in articleDetails.label" :key="list" class="tag">{{list}}</span>
      </div>
    </div>
    <div class="detail-body" v-html="markHtml"></div>
    <div class="detail-footer">
    </div>
    <div v-show="background" class="background">
      <div class="img-wrapper">
        <img :src="backgroundImg" class="background-animate" >
      </div>
      <img src="../../assets/close.png" class="close" @click="hidePrview">
    </div>
  </div>
</template>

<script>
  import {dateFormat} from '../../utils/index';
  import marked from 'marked';
  import axios from '~/plugins/axios';
  import highlight from 'highlight.js/lib/highlight'
  import javascript from 'highlight.js/lib/languages/javascript';
  import css from 'highlight.js/lib/languages/css';
  import php from 'highlight.js/lib/languages/php';
  import python from 'highlight.js/lib/languages/python'
  import sql from 'highlight.js/lib/languages/sql'
  import bash from 'highlight.js/lib/languages/bash'
  highlight.registerLanguage('javascript', javascript);
  highlight.registerLanguage('css', css);
  highlight.registerLanguage('php', php);
  highlight.registerLanguage('python', python);
  highlight.registerLanguage('sql', sql);
  highlight.registerLanguage('bash', bash);

  import '../../assets/hybrid.css'
  dateFormat()
  export default {
    async asyncData ({params, error}) {
      try {
        const {id} = params;
        // const {data: {articleDetails}} = await axios.get('/api/articleDetails/'+ id);
        let articleDetails={
          "label": [
            "vue",
            "html5"
          ],
          "user": [
            {
              "name": "lao zhang"
            }
          ],
          "comment": [],
          "_id": "5aed92f028e94e763ff29ede",
          "title": "vue图片上传预览裁剪组件，支持移动端放大缩小平移。",
          "articleContent": "#### vue-imageClip ####\n\nvue图片上传预览裁剪组件，支持移动端放大缩小平移。零、实现红色的部分\n" +
            "一、Nuxt项目搭建\n" +
            "1、通过脚手架工具初始化项目\n" +
            "2、项目整体目录结构\n" +
            "3、路由定义\n" +
            "4、\n" +
            "\n" +
            "## 安装\n" +
            "\n" +
            "Hello requires __node v7.6.0__ or higher for ES2015 and async function support.\n" +
            "\n" +
            "```\n" +
            "$ npm install hello\n" +
            "```\n" +
            "\n" +
            "## Hello Koa\n" +
            "\n" +
            "```js\n" +
            "const Hello = require('hello');\n" +
            "const app = new Hello();\n" +
            "\n" +
            "// response\n" +
            "app.use(ctx => {\n" +
            "  ctx.body = 'Hello';\n" +
            "});\n" +
            "\n" +
            "app.listen(3000);\n" +
            "```\n" +
            "\n" +
            "## Getting started\n" +
            "\n" +
            " - [Kick-Off-Hello](https://github.com/koajs/kick-off-koa) - An intro to Hello via a set of self-guided workshops.\n" +
            " - [Workshop](https://github.com/koajs/workshop) - A workshop to learn the basics of Hello.\n" +
            " - [Introduction Screencast](http://knowthen.com/episode-3-koajs-quickstart-guide/) - An introduction to installing and getting started with Hello\n" +
            "\n" +
            "\n" +
            "## 示例\n" +
            "\n" +
            "Hello is a middleware framework that can take two different kinds of functions as middleware:\n" +
            "\n" +
            "### ___async___ functions (node v7.6+)\n" +
            "\n" +
            "```js\n" +
            "app.use(async (ctx, next) => {\n" +
            "  const start = Date.now();\n" +
            "  await next();\n" +
            "  const ms = Date.now() - start;\n" +
            "  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);\n" +
            "});\n" +
            "```\n" +
            "\n" +
            "### Common function\n" +
            "\n" +
            "```js\n" +
            "// Middleware normally takes two parameters (ctx, next), ctx is the context for one request,\n" +
            "// next is a function that is invoked to execute the downstream middleware. It returns a Promise with a then function for running code after completion.\n" +
            "\n" +
            "app.use((ctx, next) => {\n" +
            "  const start = Date.now();\n" +
            "  return next().then(() => {\n" +
            "    const ms = Date.now() - start;\n" +
            "    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);\n" +
            "  });\n" +
            "});\n" +
            "```\n" +
            "\n" +
            "### Hello v1.x Middleware Signature\n" +
            "\n" +
            "The middleware signature changed between v1.x and v2.x.  The older signature is deprecated.\n" +
            "\n" +
            "**Old signature middleware support will be removed in v3**\n" +
            "\n" +
            "\n" +
            "## Context, Request and Response\n" +
            "\n" +
            "Each middleware receives a Koa `Context` object that encapsulates an incoming\n" +
            "http message and the corresponding response to that message.  `ctx` is often used\n" +
            "as the parameter name for the context object.\n" +
            "\n" +
            "```js\n" +
            "app.use(async (ctx, next) => { await next(); });\n" +
            "```\n" +
            "\n" +
            "```js\n" +
            "app.use(async (ctx, next) => {\n" +
            "  ctx.assert(ctx.request.accepts('xml'), 406);\n" +
            "  // equivalent to:\n" +
            "  // if (!ctx.request.accepts('xml')) ctx.throw(406);\n" +
            "  await next();\n" +
            "});\n" +
            "```\n" +
            "\n" +
            "\n" +
            "\n" +
            "```js\n" +
            "app.use(async (ctx, next) => {\n" +
            "  await next();\n" +
            "  ctx.response.type = 'xml';\n" +
            "  ctx.response.body = fs.createReadStream('really_large.xml');\n" +
            "});\n" +
            "```\n" +
            "\n" +
            "The `Context` object also provides shortcuts for methods on its `request` and `response`.  In the prior\n" +
            "examples,  `ctx.type` can be used instead of `ctx.request.type` and `ctx.accepts` can be used\n" +
            "instead of `ctx.request.accepts`.\n" +
            "\n" +
            "For more information on `Request`, `Response` and `Context`, see other\n" +
            "\n" +
            "## Hello Application\n" +
            "\n" +
            "The object created when executing `new Koa()` is known as the Koa application object.\n" +
            "\n" +
            "The application object is Koa's interface with node's http server and handles the registration\n" +
            "of middleware, dispatching to the middleware from http, default error handling, as well as\n" +
            "configuration of the context, request and response objects.\n" +
            "\n" +
            "Learn more about the application object in the [Application API Reference](docs/api/index.md).\n" +
            "\n" +
            "## Documentation\n" +
            "\n" +
            " - [Usage Guide](docs/guide.md)\n" +
            " - [Error Handling](docs/error-handling.md)\n" +
            " - [Koa for Express Users](docs/koa-vs-express.md)\n" +
            " - [FAQ](docs/faq.md)\n" +
            " - [API documentation](docs/api/index.md)\n" +
            "\n" +
            "## Babel setup\n" +
            "\n" +
            "If you're not using `node v7.6+`, we recommend setting up `babel` with [`babel-preset-env`](https://github.com/babel/babel-preset-env):\n" +
            "\n" +
            "```bash\n" +
            "$ npm install babel-register babel-preset-env --save\n" +
            "```\n" +
            "\n" +
            "Setup `babel-register` in your entry file:\n" +
            "\n" +
            "```js\n" +
            "require('babel-register');\n" +
            "```\n" +
            "\n" +
            "And have your `.babelrc` setup:\n" +
            "\n" +
            "\n" +
            "## Troubleshooting\n" +
            "\n" +
            "Check the [Troubleshooting Guide](docs/troubleshooting.md) or [Debugging Koa](docs/guide.md#debugging-koa) in\n" +
            "the general Koa guide.\n" +
            "\n" +
            "## Running start\n" +
            "\n" +
            "```\n" +
            "$ npm start\n" +
            "```\n" +
            "\n" +
            "## 作者\n" +
            "\n" +
            "See [AUTHORS](AUTHORS).\n" +
            "\n" +
            "## Community\n" +
            "\n" +
            " - [Badgeboard](https://koajs.github.io/badgeboard) and list of official modules\n" +
            " - [Examples](https://github.com/koajs/examples)\n" +
            " - [Middleware](https://github.com/koajs/koa/wiki) list\n" +
            " - [Wiki](https://github.com/koajs/koa/wiki)\n" +
            " - [G+ Community](https://plus.google.com/communities/101845768320796750641)\n" +
            " - [Reddit Community](https://www.reddit.com/r/koajs)\n" +
            " - [Mailing list](https://groups.google.com/forum/#!forum/koajs)\n" +
            " - [中文文档 v1.x](https://github.com/guo-yu/koa-guide)\n" +
            " - [中文文档 v2.x](https://github.com/demopark/koa-docs-Zh-CN)\n" +
            " - __[#Hellojs]__ on freenode\n" +
            "\n项目加载欢迎页面\n " +
            "二、首页结构布局\n\n**[Github地址](https://github.com/Hzy0913/vue-imageClip \"Github地址\")**\n\n### 在线预览 ###\n[在线预览地址](http://admin.binlive.cn/mavatar \"预览地址\")\n\n##### 二维码预览\n[![qrcode](http://img.binlive.cn/upload/1521910380734 \"qrcode\")](http://img.binlive.cn/upload/1521910380734 \"qrcode\")\n### 使用 ###\n安装\n\n    $ npm install vue-imgclip\n引入\n\n    import VimageClip from 'vue-imgclip'\n\n注册组件后创建`<VimageClip />`标签\n\n      // script\n      components: {\n        VimageClip\n      }\n\n\t  // html\n\t  <VimageClip @imageClipper=\"handleclip\"/>\n\n\n### 方法 ###\n\n\n图片裁剪: @imageClipper=\"handleclip\"\n图片裁剪方法，回调中可以获取裁剪完成base64和图片原始信息。\n\n      methods: {\n        handleclip(data) {\n          console.log(data);\n        }\n      }\n### 组件参数 ###\n\n    <VimageClip\n      width=\"300px\"\n      height=\"300px\"\n      backgroundColor=\"#ff6633\"\n      :hd=false\n      :control=\"true\"\n      :buttonValue='{ clipText: \"裁剪\", clipClass: \"clip-button\"}'\n      @imageClipper=\"handelclip\"\n    />\n\n|参数   |值   |描述   |\n| ------------ | ------------ | ------------ |\n| width  |(string)默认200px   | 不传则默认为生成200px宽的头像上传域  |\n| height  |(string)默认200px   | 不传则默认为生成200px高的头像上传域  |\n|  backgroundColor | (string)默认为空  | 不传则裁剪时空的区域为透明  |\n|  hd |  (boolean)默认为true  |  默认为生成两倍大小图片，解决高清屏中图片生成不清晰 |\n|  control |  (boolean)默认为false  |  默认不显示控制器，可在pc端中显示调整图片大小的控制器 |\n|  buttonValue |  (object)默认为{clipText: '裁剪', clipClass: 'button', resetText: '重置', resetClass: 'button'}  |  生成的裁剪和重置按钮属性，clipText为裁剪按钮文字属性，resetText为重置按钮，clipClass和resetClass为两个按钮的class |\n|  imageClipper |  (function)图片裁剪回调方法  |  function(data),data为图片裁剪生成的base64和图片原始信息 |\n",
          "date": "2018-05-05T11:18:16.000Z",
          "state": "publish",
          "introduce": "vue-imageClip是一个基于vue的图片裁剪组件，支持在线预览、移动缩放。",
          "tag": "vue",
          "__v": 0
        }

        const {articleContent, ...articleDetail} = articleDetails;
        marked.setOptions({
          renderer: new marked.Renderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
          highlight: function (code, lang) {
            return highlight.highlightAuto(code).value;
          }
        })
        const markHtml = marked(articleContent);
        return {articleDetails, markHtml};
      } catch (err) {
        error({ statusCode: 404})
      }
    },
    name: 'Articledetails',
    data () {
      return {
        background: false,
        backgroundImg: '',
      }
    },
    head () {
      return {
        title: this.articleDetails.title || 'binlive',
        meta: [
          { hid: 'description', name: 'description', content: `${this.articleDetails.title},前端开发,前端,web前端开发,node,vue,react,webpack,git` },
          { name: 'keywords', content: this.articleDetails.title }
        ]
      }
    },
    mounted() {
      document.querySelectorAll('.detail-body img').forEach(item => {
        item.addEventListener('click', () => {
          document.documentElement.style.overflow = "hidden";
          this.background = true;
          this.backgroundImg = item.src;
        });
      })
    },
    methods: {
      hidePrview () {
        this.background = false;
        this.backgroundImg = '';
        document.documentElement.style.overflow = "auto";
      }
    },
    computed: {
      authUrl() {
        const id = this.$route.params.id;
        return `https://github.com/login/oauth/authorize?client_id=ee9b0ae4553f4fb449bf&state=${id}&redirect_uri=http://www.binlive.cn:3080/api/oauth`;
      }
    },
    components: {
    },
    beforeDestroy() {
      window.loading = this.$loading({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)'
      });
    }
  }
</script>

<style scoped>
  @keyframes fadeInRight {
    from {
      opacity: 0.6;
      transform: translate3d(20px, 0, 0);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  .fadein{
    animation-name: fadeInRight;
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  .detail-body pre{background-color:#282a36 !important}
  #articlesDetails { height: 100vh; overflow: scroll;
    text-align: center;
    padding: 0 1rem;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    opacity:1; -webkit-transform:translate3d(0, 10px, 0);transform:translate3d(0, 10px, 0);
  }
  .detail-header {
    width:140%;margin-left:-20%; background-color:#004c99;min-height:200px;padding-left:20%;
  }
  .detail-header>h1{ font-size:24px; color:#fff;font-weight:900;padding-top:100px;text-align:left;padding-left:20px;}
  .detail-header .time { font-size:14px;color:#f2f2f2; margin-top:10px;margin-bottom:4px; text-align:left;padding-left:22px; }
  .detail-body-tag{padding-left:22px;}
  .detail-body-tag span{float:left;border-radius:2px; padding:4px 8px;background-color:#fff;margin-right:10px; box-shadow:1px 1px 1px rgba(2,58,114,.1)}
  .detail-body-tag span:nth-child(1n){background-color:#007fff;color:#fff}
  .detail-body{ text-align: left; border-bottom: 1px solid #f0f0f0; color: #666; padding:22px;padding-bottom:10px;min-height:500px;padding-top:40px;}
  .background{width: 100%; height: 100%; background-color: #fff; position: fixed;left: 0px; top: 0px;z-index: 888; padding-top: 140px}
  .img-wrapper {width: 80%; height: 100%; overflow: auto; margin: 0 auto; padding: 0px 0px 30px 0px;}
  .img-wrapper img {width: 100%; transition: all 0.3s ease-in-out;}
  .close {position: fixed; right: 4%; top: 130px; width: 50px; opacity: 0.4; cursor: pointer}
</style>
