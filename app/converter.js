const fs = require("fs");
const { resolve } = require("path");
const createMindMap = require("./mindmap");


class Converter {
    _jsonToKm(){
        createMindMap(this.json, this.targetFilePath);
    }

    _csvToJson(){
        let f = this.rs.split("\n");
        let headers = f.shift().split(";");

        let jsonObj = [];
        f.forEach(function(d) {
            let tmp = {};
            let row = d.split(";");
            for(let i = 0; i < headers.length; i ++) {
                tmp[headers[i]] = row[i];
            }
            jsonObj.push(tmp);
        });
        this.json = JSON.stringify(jsonObj);
        this._jsonToKm();
    };

    writeToKm(filePath) {
        this.targetFilePath = filePath.replace(".csv", ".km");

        const readFile = function(filePath) {
            return new Promise(resolve => {
                fs.exists(filePath, function(exist) {
                    if(exist) {
                        let rs = fs.readFileSync(filePath, {encoding: "utf-8"});
                        resolve(rs);
                    }else{
                        console.log("error", new Error("File does not exist. Check to make sure the file path to your csv is correct."));
                    }
                })
            });
        };
        
        readFile(filePath).then(result => {
            this.rs = result;
            this._csvToJson();
        });
    };
}

module.exports = Converter;