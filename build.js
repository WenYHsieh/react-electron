const path = require('path');
const builder = require('electron-builder');

builder
  .build({
    projectDir: path.resolve(__dirname),
    win: ['portable', 'nsis'],
    mac: ['dmg'],
    config: {
      appId: 'app.electron.todoList',
      productName: 'React Based Electron',
      copyright: 'Copyright © 2022 Yu',
      directories: {
        output: 'electron-build/win',
      },
      win: {
        icon: path.resolve(__dirname, 'icon.png'),
      },
      mac: {
        icon: path.resolve(__dirname, 'icon.png'),
      },
      files: [
        'build/**/*',
        'node_modules/**/*',
        'package.json',
        'main.js',
        'preload.js',
      ],
      extends: null,
    },
  })
  .then(
    (data) => console.log(data),
    (err) => console.error(err)
  );
