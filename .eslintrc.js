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
    'consistent-return': 'off',
    // 换行符统一使用CRLF，防止在代码合并时，由于换行符不同而引起大范围的冲突
    'linebreak-style': ["error", "windows"], 
    'no-shadow': 'off',

    //  @typescript-eslint/eslint-plugin
    '@typescript-eslint/no-shadow': 'error',

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
    // 作用于引入模块的那个文件。以下配置表示在任何目录下的vite.config.ts中可以引入列在package.json的devDependencies中的依赖
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*/vite.config.ts'] }],
  },

  settings: {
    'import/extensions': ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.vue'],
        pathFilter(pkg, path, relativePath) {
          if (pkg.name === 'unplugin-vue-components') {
            if (['vite', 'resolvers'].includes(relativePath)) return `./dist/${relativePath}`
          }
        },
      },
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.vue'],
      },
    },
  },
}
