'use strict';
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const builder = require('electron-builder');
const config = require('./config');

function shouldBuildOs(os) {
  return !process.env.ELECTRON_OS || process.env.ELECTRON_OS === os;
}

async function build() {
  console.log('Beginning Electron build process...');
  const mainBuildDir = path.join(config.path.output, 'electron-main');
  const jsBuildDir = path.join(config.path.output, 'electron-js');
  const electronBuildsDir = path.join(config.path.output, 'electron-builds');
  const compression = 'store';

  console.log('Clearing out old builds...');
  rimraf.sync(electronBuildsDir);

  fs.copyFileSync(
    path.join(mainBuildDir, 'main.js'),
    path.join(jsBuildDir, 'main.js')
  );

  // Builder requires package.json be in the app directory, so copy it in
  fs.copyFileSync(
    path.join(config.path.root, 'package.json'),
    path.join(jsBuildDir, 'package.json')
  );

  try {
    await builder.build({
      mac: shouldBuildOs('mac') ? ['zip', 'dmg'] : undefined,
      win: shouldBuildOs('windows') ? ['nsis'] : undefined,
      linux: shouldBuildOs('linux') ? ['AppImage'] : undefined,
      x64: true,
      ia32: true,
      config: {
        appId: 'com.github.mycrypto.mycryptohq',
        productName: 'HaicPC',
        directories: {
          app: jsBuildDir,
          output: electronBuildsDir
        },
        mac: {
          category: 'public.app-category.finance',
          //xxl 1.0.0 install mac
          //icon: path.join(config.path.electron, 'icons/icon.icns'),
          icon: path.join(config.path.electron, 'icons/icon2.png'),
          compression
        },
        win: {
          //xxl 1.0.0 install win
          //icon: path.join(config.path.electron, 'icons/icon.ico'),
          icon: path.join(config.path.electron, 'icons/icon.png'),
          compression
        },
        linux: {
          category: 'Finance',
          icon: path.join(config.path.electron, 'icons/icon.png'),
          compression
        },
        // IMPORTANT: Prevents from auto publishing to GitHub in CI environments
        publish: null,
        // IMPORTANT: Prevents extending configs in node_modules
        extends: null,
        // IMPORTANT: Prevents build issues for Github Actions
        npmRebuild: false,
      }
    });

    console.info(`Electron builds are finished! Available at ${electronBuildsDir}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

build();
