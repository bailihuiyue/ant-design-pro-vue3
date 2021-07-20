module.exports = {
  plugins: ['wdio'],
  extends: 'plugin:wdio/recommended',
  env: {
    mocha: true,
  },
  rules: {
    'class-methods-use-this': 'off',
    'max-len': 'off',
    strict: 'off',
  },
};
