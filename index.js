const path = require('path');
const { mkdir, writeLog, exportLog } = require('./src/log.js');
const writeFile = require('./src/write.js');

class MyPlugin {
    constructor(options = {}) {
        const {
            showConsoleTime = true,
            log = true,
            exportLog = false,
            writeFile = {
              exec: false,
              include: '',
              data: ''
            }
        } = options;
        this.options = {
            showConsoleTime,
            log,
            exportLog,
            writeFile
        };
        this.externalModules = {};
    }
    
    apply(compiler) {
        this.options.showConsoleTime && console.time('myPlugin执行时间');
        
        // 获取打包输出目录
        const exportPath = compiler.options.output.path;

        // 在生成资源并输出到目录之前（可以将里面的逻辑放在afterEmit钩子里）
        compiler.hooks.emit.tap('demo', (compilation) => {
            // 日志
            if (this.options.log) {
                mkdir(exportPath).then(() => {
                    let fileName = `${JSON.stringify(new Date().setHours(new Date().getHours() + 8))}_demo.log`;
                    let filePath = path.resolve(`${exportPath}/logs/${fileName}`);
                    
                    writeLog(compilation, filePath);
                    
                    exportLog(filePath, this.options.exportLog.path, fileName);
                });
            }
        });

        // 在生成资源并输出到目录之后
        compiler.hooks.afterEmit.tap('demo', (compilation) => {
            // 将数据写入文件功能
            if (this.options.writeFile && this.options.writeFile.exec) {
                // 包含的文件/目录
                let include = this.options.writeFile.include;

                // 待写入的数据
                let data = this.options.writeFile.data;

                writeFile(include, exportPath, data);
            }
        })

        compiler.hooks.done.tap('demo', (compilation) => {
            console.log('hahaha，我完成了编译');
        })

        this.options.showConsoleTime && console.timeEnd('myPlugin执行时间');
    }
}

module.exports = MyPlugin;