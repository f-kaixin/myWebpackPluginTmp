const fs = require('fs');
const util = require('util');

/**
    mkdir 判断是否存在并创建存放日志的目录
    @param {String} exportPath 打包目录的绝对路径
    @return {Promise}
*/
const mkdir = (exportPath) => {
    return new Promise(function(resolve, reject) {
        fs.exists(`${exportPath}/logs`, (exists) => {
            if (!exists) {
                fs.mkdir(`${exportPath}/logs`, err => {
                    err && console.log(err);
                    resolve();
                })
            } else {
                resolve();
            }
        });
    })
}

/**
    writeLog 写入日志
    @param {Object} compilation webpack钩子compilation对象参数
    @param {String} filePath 待写入日志的绝对路径
*/
const writeLog = (compilation, filePath) => {
    fs.writeFile(
        filePath, 
        // 使用util.inspect而不是JSON.stringify来处理对象转字符串中可能存在的循环引用问题
        util.inspect(compilation, true, 5, true), 
        {flag: 'a', encoding: 'utf-8'}, 
        (err) => {
            if (err) {
                throw err;
            } 
            console.log(`写入 ${filePath} 文件成功！`)
        }
    )
}

/**
    exportLog 导出日志
    @param {String} filePath 待写入日志的绝对路径
    @param {String} targetPath 保存日志的目录
    @param {String} fileName 待保存日志的文件名
*/
const exportLog = (filePath, targetPath, fileName) => {
    fs.copyFile(filePath, `${targetPath}/${fileName}`, () => {

    });
}

module.exports = {
    mkdir,
    writeLog,
    exportLog
}