import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Notification,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import { initialize, enable } from '@electron/remote/main';
import path from 'path';

import Config from './config.json';

export const IS_DEV =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const AppTitle = 'PIXEL Launcher';
const AppIconLocation = path.join(__dirname, 'splash', 'pixel-icon.ico');

const gotTheLock = app.requestSingleInstanceLock();

const supportOS = ['win32']; // , 'linux', 'darwin'

let mainWindow: BrowserWindow | null = null;

app.disableHardwareAcceleration();

autoUpdater.autoDownload = true;
autoUpdater.allowDowngrade = false;
autoUpdater.setFeedURL({
  provider: 'github',
  repo: Config.EUGithubRepo,
  owner: Config.EUGithubOwner,
  private: Config.EUGithubPrivate,
  token: Config.EUGithubToken,
});

const Launch = async () => {
  let isGameRunning = false;

  if (!IS_DEV) {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
  }

  const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer
      .default(
        extensions.map((name) => installer[name]),
        forceDownload
      )
      .catch(console.log);
  };

  ipcMain.on('showWindow', () => {
    if (!mainWindow) return null;
    mainWindow.show();
  });
  ipcMain.on('minimizeWindow', () => {
    if (!mainWindow) return null;
    if (mainWindow.isMinimizable()) mainWindow.minimize();
  });
  ipcMain.on('closeWindow', () => {
    if (!mainWindow) return null;
    if (mainWindow.isClosable()) mainWindow.close();
  });
  // ipcMain.on('launchGame')

  const createWindow = async () => {
    if (IS_DEV) {
      await installExtensions();
    }

    mainWindow = new BrowserWindow({
      show: false,
      width: 1280,
      height: 720,
      minWidth: 1280,
      minHeight: 720,
      maxWidth: 1280,
      maxHeight: 720,
      resizable: false,
      maximizable: false,
      minimizable: true,
      frame: false,
      titleBarStyle: 'hidden',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      // backgroundColor: '#f5f5f6',
      transparent: true,
      title: AppTitle,
      icon: AppIconLocation,
    });

    let locale = '';
    if (IS_DEV)
      locale = new URL(`http://localhost:${process.env.PORT || 1212}/`).href;
    else
      locale = `file://${path.resolve(
        __dirname,
        '..',
        'renderer',
        'index.html'
      )}`;
    mainWindow.webContents.session.clearCache();

    mainWindow.loadURL(locale);

    mainWindow.on('ready-to-show', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      // splash.destroy();
      mainWindow.show();
    });
  };

  app.on('browser-window-focus', () => {
    globalShortcut.register('CommandOrControl+R', () => {});
    globalShortcut.register('F5', () => {});
  });

  app.on('browser-window-blur', () => {
    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister('F5');
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin' && !isGameRunning) {
      app.quit();
    }
  });

  app.on('second-instance', () => {
    if (!isGameRunning && mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  await createWindow();
  if (!mainWindow)
    throw Error(
      '프로그램이 제대로 설정되지 않았습니다. 문제가 지속될경우 문의하세요.'
    );

  initialize();

  enable(mainWindow.webContents);
};

if (supportOS.indexOf(process.platform) === -1) {
  app.quit();
  process.exit(1);
} else if (!gotTheLock) app.quit();
else {
  // Launch();
  app
    .whenReady()
    .then(async () => {
      app.setAppUserModelId('PIXEL Launcher');
      // const notifyTest = new Notification({
      //   title: '업데이트를 발견했습니다!',
      //   body: '자동으로 다운로드 후, 재시작됩니다.',
      //   icon: AppIconLocation,
      // });
      // notifyTest.show();

      // const splashWindow = new BrowserWindow({
      //   show: false,
      //   width: 250,
      //   height: 300,
      //   resizable: false,
      //   maximizable: false,
      //   minimizable: false,
      //   frame: false,
      //   transparent: true,
      //   alwaysOnTop: false,
      //   titleBarStyle: 'hidden',
      //   webPreferences: {
      //     nodeIntegration: true,
      //     contextIsolation: false,
      //   },
      //   // backgroundColor: '#f5f5f6',
      //   title: AppTitle,
      //   icon: AppIconLocation,
      // });
      // splashWindow.loadFile(path.join(__dirname, 'splash', 'splash.html'));

      autoUpdater.on('checking-for-update', () => {
        console.log('Checking for update...');
      });
      autoUpdater.on('update-available', () => {
        console.log('Update available.');
        const notify = new Notification({
          title: '업데이트를 발견했습니다!',
          body: '자동으로 다운로드 후, 재시작됩니다.',
          icon: AppIconLocation,
        });
        notify.show();
      });
      autoUpdater.on('update-not-available', async () => {
        console.log('Update not available.');
        await Launch();
      });
      autoUpdater.on('error', (err) => {
        console.log(`Error in auto-updater. ${err}`);
        throw new Error(err);
      });
      autoUpdater.on('download-progress', (progressObj) => {
        const logMessage = `업데이트 중... ${Math.round(progressObj.percent)}%`;
        console.log(logMessage);
      });
      autoUpdater.on('update-downloaded', (info) => {
        console.log('Update downloaded');
        console.log(info);
        autoUpdater.quitAndInstall(true, true);
      });

      autoUpdater.checkForUpdates();
    })
    .catch((err) => {
      console.error(err);
      app.quit();
      process.exit(1);
    });
}
