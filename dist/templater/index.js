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
const fs = __importStar(require("fs"));
const lib_1 = require("./lib");
const promptSync = __importStar(require("prompt-sync"));
const prompt = promptSync();
const newNamePascal = prompt('What is ClassName?: ');
const newNameKebab = newNamePascal
    .replace(/([a-z0–9])([A-Z])/g, '$1-$2')
    .toLowerCase();
const main = async () => {
    const srcDir = `../src/modules/xxx`;
    const destDir = `../src/modules/${newNameKebab}`;
    if (fs.existsSync(destDir))
        fs.rmSync(destDir, { recursive: true });
    fs.mkdirSync(destDir);
    fs.cpSync(srcDir, destDir, { recursive: true });
    (0, lib_1.findAndReplace)(`${destDir}/**/*`, 'Xxx', newNamePascal);
    (0, lib_1.findAndReplace)(`${destDir}/**/*`, 'xxx', newNameKebab);
    (0, lib_1.findAndReplace)(`${destDir}/**/*`, '// @ts-ignore', '');
    (0, lib_1.findAndRename)(`${destDir}/**/*`, 'xxx', newNameKebab);
};
void main();
//# sourceMappingURL=index.js.map