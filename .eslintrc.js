module.exports = {
  extends: [
    '@vue/eslint-config-typescript',
    '@dc/eslint-config-vue3/vue3.js',
  ],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
  },
}
