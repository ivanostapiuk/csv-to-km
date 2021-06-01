#!/usr/bin/env node

let Converter = require('./app/converter');

const main = function main() {
    if (process.argv.length == 3) {
        try {
            converter = new Converter()
            converter.writeToKm(process.argv[2])
        } catch (err) {
            console.error(err);
        }
    } else {
        console.error('missing required argument (source csv file path)')
    }
}();