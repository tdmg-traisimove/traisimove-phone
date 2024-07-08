import i18next from 'i18next';
import { displayError, displayErrorMsg, logDebug, logWarn } from '../plugin/logger';

function localDBHelpers(fileName: string, fileExtension: string = '.txt') {
  async function localCopyFile() {
    return new Promise<void>((resolve, reject) => {
      let pathToFile, parentDirectory;
      if (window['cordova'].platformId == 'android') {
        // parentDirectory: file:///data/user/0/edu.berkeley.eecs.emission/files/
        parentDirectory = window['cordova'].file.dataDirectory.replace('files', 'databases');
        // pathToFile: /data/user/0/edu.berkeley.eecs.emission/files/
        pathToFile = parentDirectory.replace('file://', '') + fileName;
      } else if (window['cordova'].platformId == 'ios') {
        // parentDirectory: file:///var/mobile/Containers/Data/Application/<32-hex-digit-id>/Library/NoCloud/../
        parentDirectory = window['cordova'].file.dataDirectory + '../';
        pathToFile = 'LocalDatabase/' + fileName;
      } else {
        displayErrorMsg('Error: Unknown OS!');
        throw new Error('Error: Unknown OS!');
      }

      window['resolveLocalFileSystemURL'](parentDirectory, (fs) => {
        // On iOS, pass in relative path to getFile https://github.com/e-mission/e-mission-phone/pull/1160#issuecomment-2192112472
        // On Android, pass in absolute path to getFile https://github.com/e-mission/e-mission-phone/pull/1160#issuecomment-2204297874
        fs.filesystem.root.getFile(pathToFile, { create: false, exclusive: false }, (fileEntry) => {
          // logDebug(`fileEntry ${fileEntry.nativeURL} is file? ${fileEntry.isFile.toString()}`);
          logDebug(`fileEntry is: ${JSON.stringify(fileEntry, null, 2)}`);
          window['resolveLocalFileSystemURL'](window['cordova'].file.cacheDirectory, (copyDir) => {
            logDebug(`DirectoryEntry is: ${JSON.stringify(copyDir.filesystem.root, null, 2)}`);

            fileEntry.copyTo(
              copyDir.filesystem.root,
              fileName + fileExtension,
              (res) => {
                logDebug(`Res: ${res}`);
                resolve();
              },
              (rej) => {
                displayErrorMsg(`Rej: ${JSON.stringify(rej, null, 2)}`);
                reject();
              },
            );
          });
        });
      });
    });
  }

  function localShareFile() {
    return new Promise<void>((resolve, reject) => {
      window['resolveLocalFileSystemURL'](window['cordova'].file.cacheDirectory, (fs) => {
        fs.filesystem.root.getFile(
          fileName + fileExtension,
          null,
          (fileEntry) => {
            const shareObj = {
              files: [fileEntry.nativeURL],
              message: i18next.t('shareFile-service.send-log.body-please-fill-in-what-is-wrong'),
              subject: i18next.t('shareFile-service.send-log.subject-logs'),
            };
            window['plugins'].socialsharing.shareWithOptions(
              shareObj,
              (result) => {
                logDebug(`Share Completed? ${result.completed}`); // On Android, most likely returns false
                logDebug(`Shared to app:  ${result.app}`);
                resolve();
              },
              (error) => {
                displayError(error, `Sharing failed with error`);
              },
            );
          },
          (error) => {
            displayError(error, 'Error while sharing logs');
            reject(error);
          },
        );
      });
    });
  }

  function localClearTmpFile() {
    return new Promise<void>((resolve, reject) => {
      window['resolveLocalFileSystemURL'](window['cordova'].file.cacheDirectory, (fs) => {
        fs.filesystem.root.getFile(fileName + fileExtension, null, (fileEntry) => {
          fileEntry.remove(
            () => {
              logDebug(`Successfully cleaned up file ${fileName}`);
              resolve();
            },
            (err) => {
              displayError(err, `Error deleting ${fileName}`);
              reject(err);
            },
          );
        });
      });
    });
  }

  return {
    copyFile: localCopyFile,
    shareData: localShareFile,
    clearTmpFile: localClearTmpFile,
  };
}
export async function sendLocalDBFile(database: string) {
  alert(i18next.t('shareFile-service.send-to'));

  const dataMethods = localDBHelpers(database);
  dataMethods
    .copyFile()
    .then(dataMethods.shareData)
    .then(dataMethods.clearTmpFile)
    .then(() => {
      logDebug(`File Shared!`);
    })
    .catch((err) => {
      displayError(err);
    });
}
