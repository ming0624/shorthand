/*
 * @Author: yuechu
 * @Date: 2021-02-24 11:15:16
 * @LastEditors: yuechu
 * @LastEditTime: 2021-03-04 14:25:31
 */
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  loader: 'postcss-loader',
  plugins: {
    'autoprefixer': {},
    'postcss-import': {},
    'postcss-url': {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是 750/375
      viewportHeight: 667, // 视窗的高度，对应 1334/667
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude: [/(\/|\\)(node_modules)(\/|\\)/],
    },
  },
};
