const fs = require('fs');
const { promisify } = require('util');
const ejs = require('ejs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const data = require('../src/__data__');
const buildDir = './build';

(async function () {
    const preview = process.argv[2];
    
    const base = await readFile('./src/__base__.ejs', 'utf8');
    const template = await readFile('./src/__template__.ejs', 'utf8');
    const styles = await readFile('./src/__style__.css', 'utf8');

    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir);
    }

    let out = base.replace('/* [[Styles]] */', styles);
    out = out.replace('<!-- [[Template]] -->', template);

    if (preview && preview === '--preview') {
        let compiled = ejs.compile(out);
        out = compiled(data);

        await writeFile(buildDir + '/template-prev.html', out);
    } else {
        await writeFile(buildDir + '/template.html', out);
    }
})();