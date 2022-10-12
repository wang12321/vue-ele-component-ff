module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
      'plugins': ['dynamic-import-node']
    }
  },
  plugins:[
    ["import",
      {
        "libraryName": "vue-ele-component-ff",
        "style":(name, file) => {
          if(name === 'antd/lib/utils'){
            return false;
          }
          return  false;
        },
        // "libraryDirectory":"lib",
        "camel2DashComponentName": false,
      }
    ]
  ]
}
