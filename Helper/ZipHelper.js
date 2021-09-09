import { createWriteStream, createReadStream } from 'fs';
const archiver = require('archiver');
const fs = require('fs').promises

const ZipFolder = async (source) => {
    try {
        var output = createWriteStream(__basedir + `/${source}.zip`);
        var archive = archiver('zip');
        archive.on('error', function (err) {
            throw err;
        });
        archive.pipe(output);
        var files = await fs.readdir(__basedir + "/" + source);
        files.forEach(e => {
            archive.append(createReadStream(__basedir + "/" + source + "/" + e), { name: e });
        })
        await archive.finalize();
        return;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    ZipFolder
};