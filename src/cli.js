#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const inDir = args[0];
const outFile = args[1];
let output = 'this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs = {';

try {
    if (!fs.existsSync(inDir)) {
        throw new Error(`${inDir} does not exists`);
    }

    if (path.extname(outFile) !== '.js') {
        throw new Error(`${outFile} must be a .js file`);
    }
    
    const readFiles = fs.readdirSync(inDir, { encoding: 'utf8' });

    for (let filename of readFiles) {
        const path = `${inDir}/${filename}`;
        if (fs.lstatSync(path).isFile()) {
            const fileContent = fs.readFileSync(path);
            output += `"${filename}":"${fileContent.toString('base64')}",`;
        }
    }

    fs.writeFileSync(outFile, output.substr(0, output.length -1) + '};');
    console.log('The fonts were generated.');
} catch (err) {
    console.log(err.message);
}