module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100,
      propList: ['*'],
      selectorBlackList: [/\.position-box-with-px/],
    },
  },
}