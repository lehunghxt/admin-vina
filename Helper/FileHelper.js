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

module.exports = {
    WriteFile,
    ReadFile,
};