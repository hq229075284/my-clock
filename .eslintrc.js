module.exports = {
  // 指定es编写版本，用于解析语法、关键字等
  env: {
    es2022: true,
  },
  // an array of strings where each additional configuration extends the preceding configurations
  extends: [
    // 基础规则
    'airbnb-base',
    // 附加ts的import设置
    'plugin:import/typescript',
    // vue3规则
    'plugin:vue/vue3-strongly-recommended',
    // ts规则；告诉vue-eslint-parser，不同文件后缀对应的parser，以及传递的parserOptions
    '@vue/eslint-config-typescript',
  ],
  // 多个配置合并后的parserOptions传递给vue-eslint-parser，由vue-eslint-parser来分发对应的文件到对应的parser中
  parserOptions: {
    // node_modules\eslint-plugin-vue\lib\configs\base.js
    // +
    // node_modules\@vue\eslint-config-typescript\index.js
  },
  rules: {
    // 'no-unused-vars': 'error',
    indent: ['error', 2],
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],

    // eslint-plugin-vue
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'never',
        component: 'never',
      },
      svg: 'always',
      math: 'always',
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 5,
      },
      multiline: {
        max: 1,
      },
    }],

    // eslint-plugin-import
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      // extends配置上新增的
      ts: 'never',
      tsx: 'never',
    }],
  },
}
