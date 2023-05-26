module.exports = {
  plugins: {
    '@dc/postcss-px2var': {
      fallback: false,
    },
    'postcss-pxtorem': {
      rootValue: 100,
      propList: ['*'],
      selectorBlackList: [],
    },
  },
}
