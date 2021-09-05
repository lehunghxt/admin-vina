import { createWriteStream } from 'fs';
const archiver = require('archiver');
const path = require('path');

const ZipFolder = (dir, des) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = createWriteStream(out);
    const out = path.join(__dirname + '/' + des);
    const source = path.join(__dirname + '/' + `${dir}.zip`);

    return new Promise((resolve, reject) => {
        archive
            .directory(source, false)
            .on('error', err => reject(err))
            .pipe(stream)
            ;

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

module.exports = {
    ZipFolder
};