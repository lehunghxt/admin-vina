const fs = require("fs").promises;
const path = require('path');

const ReadFile = async (filepath) => {
    var data = await fs.readFile(path.join(__basedir + "/" + filepath), "utf-8");
    console.log(data)
    return data;
}

const WriteFile = async (filepath, data) => {
    await fs.writeFile(path.join(__basedir + "/" + filepath), data);
}

const CopyFile = async (src, des) => {
    await fs.copyFile(path.join(__basedir + "/" + src), path.join(__basedir + "/" + des));
}

const CreateFolder = async (filepath) => {
    try {
        await fs.access(path.join(__basedir + "/" + filepath));

    } catch (error) {
        fs.mkdir(path.join(__basedir + "/" + filepath));
    }
}

module.exports = {
    WriteFile,
    ReadFile,
    CopyFile,
    CreateFolder
};