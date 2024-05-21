"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTableNames = void 0;
const extractTableNames = (files) => {
    return files.map((file) => {
        const fileNameWithoutExtension = file.slice(0, -5);
        return fileNameWithoutExtension.split('_').slice(1).join('_');
    });
};
exports.extractTableNames = extractTableNames;
//# sourceMappingURL=helpers.js.map