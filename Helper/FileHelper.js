const fs = require("fs").promises;
const path = require('path');

const ReadFile = async (filepath) => {
    var data = await fs.readFile(path.join(__dirname + "/" + filepath), "utf-8");
    console.log(data)
    return data;
}

const WriteFile = async (filepath, data) => {
    await fs.writeFile(path.join(__dirname + "/" + filepath), data);
}

const CopyFile = async (src, des) => {
    await fs.copyFile(path.join(__dirname + "/" + src), path.join(__dirname + "/" + des));
}

const CreateFolder = async (filepath) => {
    try {
        await fs.access(path.join(__dirname + "/" + filepath));

    } catch (error) {
        fs.mkdir(path.join(__dirname + "/" + filepath));
    }
}

module.exports = {
    WriteFile,
    ReadFile,
    CopyFile,
    CreateFolder
};