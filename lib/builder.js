const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const buildDir = './build';

(async function () {
    const base = await readFile('./src/__base__.ejs', 'utf8');
    const template = await readFile('./src/__template__.ejs', 'utf8');
    const styles = await readFile('./src/__style__.css', 'utf8');

    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir);
    }

    let out = base.replace('/* [[Styles]] */', styles);
    out = out.replace('<!-- [[Template]] -->', template);

    await writeFile(buildDir + '/template.html', out);
})();