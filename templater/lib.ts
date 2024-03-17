import * as fs from 'fs';
import { globSync } from 'glob';
import { replaceInFile } from 'replace-in-file';

export const findAndReplace = async (
  filesPaths: string,
  findStr: string,
  replaceStr: string,
) => {
  const files = globSync(filesPaths);
  files.forEach(async (item, index, array) => {
    console.log(item + ' found');
    try {
      const options = {
        files: item,
        from: new RegExp(findStr, 'g'),
        to: replaceStr,
      };
      const changes = await replaceInFile(options);
      console.log('Replacement complete', changes);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  });
};

export const findAndRename = (
  filesPaths: string,
  findStr: string,
  replaceStr: string,
) => {
  const files = globSync(filesPaths);
  files.forEach((item, index, array) => {
    console.log(item + ' found');
    // Find and Replace string
    const newName = item.replace(findStr, replaceStr);
    fs.renameSync(item, newName);
    console.log('Rename complete');
  });
};
