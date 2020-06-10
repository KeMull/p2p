//1、导入插件( 第三方库 )
const { src, dest, parallel, watch } = require('gulp');


//首先配置插件  从dos cnpm命令下载插件
// cnpm i gulp-uglify -D  压缩js插件
// cnpm i gulp-rename -D  重置名字
// cnpm i gulp-clean-css -D 压缩css插件
// cnpm i gulp-less -D    编译less插件
// cnpm i borwser-sync -D 服务器插件


//2、导入插件( 第三方库 )
const uglify = require("gulp-uglify");                //压缩js插件
const rename = require("gulp-rename");                //重命名插件
const cleanCss = require("gulp-clean-css");           //压缩css插件
const less = require("gulp-less");                    //编译less插件
const browserSync = require("browser-sync").create(); //启动服务器插件
const reload = browserSync.reload;                    // 热加载

//3、定义任务
//3-1 js压缩
function js(){
    return src("./js/*.js")     //js源文件
      .pipe(uglify())           //处理压缩
      .pipe(
          rename({
              suffix:".min"
          })
      )                         //重命名插件
      .pipe(dest("./dist/js"))  //输出 目标文件
      .pipe(reload({            // 热加载
        stream: true
      }))

}
//3-2 编译less 压缩css
function css(){
    return src("./less/*.less") //less源文件
      .pipe(less())             //编译less ==> css
      //.pipe(less({ compress: false }))
      .pipe(cleanCss())         //压缩css
      .pipe(
          rename({
              suffix: ".min"
          })
      )                         //重命名
      .pipe(dest("./dist/css")) //输出 目标文件
      .pipe(reload({            // 热加载
        stream: true
      }))
}

// 启动服务器
function serve() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3033
    });
}


// 观察者【上帝之眼】
function auto() {
    watch("./less/*.less", css);            // css
    watch("./js/*.js", js);                 // js
    watch("**/*.html").on("change", reload) // html
}

//观察者 热加载   可以直接放在 watch("./less/*.less", css).on("change",reload)


//4、暴露
/* exports.js = js;
exports.css = css;
exports.serve = serve;
exports.auto = auto; */
exports.default = parallel(serve, css, js, auto)   //一次启动我们的任务 gulp