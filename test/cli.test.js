const { execSync } = require('child_process');
const fs = require('fs');
const input = `${__dirname}/mock-fonts`;
const output = `${__dirname}/generated-fonts/custom-fonts.js`;
const script = `${__dirname}/../src/cli.js`;
const command = execSync(`node ${script} ${input} ${output}`);

describe('Font generator cli', () => {
    afterAll(() => {
        try {
            fs.unlinkSync(output);
        } catch(err) {
            console.log(err);
        }
    });

    it('Should generate the file', () => {
        const exists = fs.existsSync(output);
        expect(exists).toBeTruthy();
    });

    it('Should create the content', () => {
        const fileContent = fs.readFileSync(output, { encoding: 'utf8' });
        const REGEX_MATCH_CONTENT = /^this\.pdfMake = this\.pdfMake \|\| \{\}; this\.pdfMake\.vfs = \{"custom-fonts.ttf"\:".+"\};$/;
        expect(fileContent).toMatch(REGEX_MATCH_CONTENT);
    });
});