const fs = require('fs');
const path = require('path');

/**
    writeFile 修改文件的数据
    @param {String} filePath 待修改文件的路径
    @param {String} exportPath 打包目录路径
    @param {String} data 待写入的数据
*/
const writeFile = (filePath, exportPath, data) => {
    // ./main.js种类
    if (typeof(filePath) === 'string') {
        fs.exists(path.resolve(exportPath, filePath), existed => {
            if (existed) {
                fs.appendFile(path.resolve(exportPath, filePath), data, error => {
                if (error) return console.log("写入文件失败,原因是" + error.message);
                    console.log("写入成功");
                });
            } else {
                console.error(`${exportPath}目录下没有${filePath}··`);
            }
        })
    }
}

module.exports = writeFile;