'use strict'
const path = require('path')
const fs = require('fs')
const join = path.join

const NODE_ENV = process.env.NODE_ENV

console.log('NODE_ENV环境是',NODE_ENV)

/**
 * 解析组件路径
 * @param {string} dir 文件相对路径
 * @returns {string} 组件绝对路径
 */
function resolvePath (dir) {
  return path.resolve(__dirname, dir)
}

function pathJoin(dir) {
  return path.join(__dirname, dir)
}

/**
 * 获取所有组件入口地址
 * @param {string} dir 组件文件夹相对当前路径
 * @returns {object} 入口地址对象
 */
function getEntries (dir) {
  const files = fs.readdirSync(dir)
  // console.log('files',files)
  const entries = files.reduce((res, file) => {
    const filePath = join(dir, file)
    const isDir = fs.statSync(filePath).isDirectory()
    if (isDir) {
      const fileNameListArr=fs.readdirSync(filePath)
      if(checkIsVueCompInDir(fileNameListArr)){
        res[file] = resolvePath(join(filePath, 'index.js'))
      }
    } else {
      // src/components/common 根目录除了 js 文件全部忽略
      if (!/common\/\w+\.[^(js)]{1,}/.test(filePath)) {
        const [fileName] = file.split('.')
        res[fileName] = resolvePath(`${filePath}`)
      }else {
        console.log(123123123)
      }
    }
    return res
  }, {})
  // console.log('entries====',entries)

  return entries
}

function checkIsVueCompInDir(fileNameArr){
  return  fileNameArr.some((fileNameArrItem)=>{
    return  fileNameArrItem.match(/\.vue/g)
  })
}

// getEntries('src/components/common')
// console.log('__dirname',__dirname)
// console.log('__filename',__filename)
// console.log('process.cwd()',process.cwd())



const devConfig={
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': pathJoin('src')
      }
    }
  },
  chainWebpack: config => {
    config.module
        .rule('js')
        .include
        // .add('/src/components/common')
        .end()
        .use('babel')
        .loader('babel-loader')
        .tap(options => {
          return options
        })

    // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(pathJoin('src/views/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(pathJoin('src/views/'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
  }



}

// 编写插件 https://www.webpackjs.com/contribute/writing-a-plugin/
function addIndexJsInStylePathWebpackPlugin(options) {
  // 可以获取用户配置
  this.options = options;

}




addIndexJsInStylePathWebpackPlugin.prototype.apply = function(compiler) {
  let stylePathArr=[];
  compiler.plugin('emit', function(compilation, callback) {
    // 遍历所有编译过的资源文件
    for (var filename in compilation.assets) {
      // console.log('filename===',filename)
      if(filename.match(/style\/index\.css/g)){
        stylePathArr.push(filename)
        // console.log('output.path===',compilation.options.output.path)
      }
    }
    // // 在生成文件中，创建一个头部字符串：
    // var filelist = 'In this build:\n\n';
    // // 遍历所有编译过的资源文件，
    // // 对于每个文件名称，都添加一行内容。
    // for (var filename0 in compilation.assets) {
    //   filelist += ('- '+ filename0 +'\n');
    // }
    //
    // // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
    // compilation.assets['filelist.md'] = {
    //   source: function() {
    //     return filelist;
    //   },
    //   size: function() {
    //     return filelist.length;
    //   }
    // };
    callback();
  });

  // 指定一个挂载到 webpack 自身的事件钩子。
  // https://webpack.docschina.org/api/compiler-hooks/#done
  compiler.plugin('done', function(compilation) {
    var jsContent = 'require("./index.css");';
    try {
      stylePathArr.forEach((stylePathArrItem)=>{
        fs.writeFileSync(`${__dirname}/lib/${path.dirname(stylePathArrItem)}/index.js`,jsContent)
      })
    } catch (err) {
      console.error('文件写入失败',err)
    }
    // compilation.plugin("optimize", function() {
    //   console.log("Assets are being optimized.");
    // });

  });


};

const buildLibConfig={
  outputDir: 'lib',
  productionSourceMap: false,
  transpileDependencies:['element-ui'],
  css: {
    sourceMap: true,
    extract: {
      filename: '[name]/style/index.css'
    },
    // loaderOptions:{
    //
    // }
  },
  configureWebpack: {
    entry: {
      ...getEntries('src/components/common')
    },
    output: {
      library: 'VueEleComponentFF',
      filename: '[name]/index.js',
      libraryTarget: 'umd'
    },
    plugins: [
      new addIndexJsInStylePathWebpackPlugin()
    ]
    // module: {
    //   rules: [
    //     {
    //       test: /\.vue$/,
    //       include: '/src/components/common',
    //       use: ['vue-loader', 'eslint-loader']
    //     },
    //     {
    //       test: /\.(js)|(vue)$/,
    //       include: '/src/components/common',
    //       use: ['babel-loader']
    //     }
    //   ]
    // }
  },
  chainWebpack: config => {
    config.module
        .rule('babel_package')
        .test(/\.(js)|(vue)$/)
        .include
        .add('/src/components/common')
        .end()
        .use('babel')
        .loader('babel-loader')
        .tap(options => {
          return options
        })

    config.module
        .rule('vue_transfer')
        .test(/\.vue$/)
        .include
        .add('/src/components/common')
        .end()
        .use('eslint-loader')
        .loader('eslint-loader')
        .end()
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          // console.log('optionsoptionsoptionsoptions=',options)
          return options
        })

    // 去除 @vue/cli 自带的一些功能
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')

    config.module
        .rule('fonts')
        .use('url-loader')
        .tap(option => {
          option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
          return option
        })
    // config.module
    //     .rule('vue_transfer')
    //     .test(/\.vue$/)
    //     .tap(option=>{
    //       console.log('option============',option)
    //       return option
    //
    //     })

  }

}



const config = NODE_ENV === 'production' ? buildLibConfig : devConfig
module.exports = config






// All configuration item explanations can be find in https://cli.vuejs.org/config/
// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias: {
//         '@': resolve('src')
//       }
//     }
//   },
//   chainWebpack(config) {
//     // set svg-sprite-loader
//     config.module
//         .rule('svg')
//         .exclude.add(resolve('src/views/icons'))
//         .end()
//     config.module
//         .rule('icons')
//         .test(/\.svg$/)
//         .include.add(resolve('src/views/icons'))
//         .end()
//         .use('svg-sprite-loader')
//         .loader('svg-sprite-loader')
//         .options({
//           symbolId: 'icon-[name]'
//         })
//         .end()
//   }
// }
