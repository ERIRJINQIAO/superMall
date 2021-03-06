module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  },
  // lintOnSave: false,
  // devServer: {
  //   overlay: {
  //   warning: false,
  //     errors: false
  //   }

  // },
}