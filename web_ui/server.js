const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/convert', (req, res) => {
    const { code, language } = req.body;

    // Save to temp file
    const tmpFile = path.join(__dirname, '..', '.tmp', `input_${Date.now()}.java`);
    if (!fs.existsSync(path.join(__dirname, '..', '.tmp'))) {
        fs.mkdirSync(path.join(__dirname, '..', '.tmp'));
    }

    fs.writeFileSync(tmpFile, code);

    // Call python converter
    const pythonScript = path.join(__dirname, '..', 'tools', 'converter.py');
    const command = `python3 "${pythonScript}" "${tmpFile}"`;

    console.log(`Executing: ${command}`);

    exec(command, (error, stdout, stderr) => {
        // Clean up
        if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);

        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: 'Conversion failed', details: stderr });
        }

        res.json({ result: stdout });
    });
});

app.listen(port, () => {
    console.log(`Backend bridge listening at http://localhost:${port}`);
});
