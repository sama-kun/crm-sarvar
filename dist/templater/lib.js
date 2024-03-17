"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndRename = exports.findAndReplace = void 0;
const fs = __importStar(require("fs"));
const glob_1 = require("glob");
const replace_in_file_1 = require("replace-in-file");
const findAndReplace = async (filesPaths, findStr, replaceStr) => {
    const files = (0, glob_1.globSync)(filesPaths);
    files.forEach(async (item, index, array) => {
        console.log(item + ' found');
        try {
            const options = {
                files: item,
                from: new RegExp(findStr, 'g'),
                to: replaceStr,
            };
            const changes = await (0, replace_in_file_1.replaceInFile)(options);
            console.log('Replacement complete', changes);
        }
        catch (error) {
            console.error('Error occurred:', error);
        }
    });
};
exports.findAndReplace = findAndReplace;
const findAndRename = (filesPaths, findStr, replaceStr) => {
    const files = (0, glob_1.globSync)(filesPaths);
    files.forEach((item, index, array) => {
        console.log(item + ' found');
        const newName = item.replace(findStr, replaceStr);
        fs.renameSync(item, newName);
        console.log('Rename complete');
    });
};
exports.findAndRename = findAndRename;
//# sourceMappingURL=lib.js.map