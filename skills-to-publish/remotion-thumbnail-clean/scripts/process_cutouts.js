const fs = require('fs');
const path = require('path');
const Replicate = require('replicate');
const https = require('https');

const STORAGE_DIR = path.join(__dirname, '../storage');
const RAW_DIR = path.join(STORAGE_DIR, 'raw');
const CUTOUT_DIR = path.join(STORAGE_DIR, 'cutouts');
const DB_PATH = path.join(STORAGE_DIR, 'expressions_db.json');

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
    console.error("❌ Error: REPLICATE_API_TOKEN environment variable is not set.");
    process.exit(1);
}

const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
});

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function processCutouts() {
    console.log("✂️ Starting Cutout Pipeline...");

    if (!fs.existsSync(CUTOUT_DIR)) fs.mkdirSync(CUTOUT_DIR, { recursive: true });

    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

    for (const exp of db.expressions) {
        if (exp.cutoutUrl && fs.existsSync(exp.cutoutUrl)) {
            console.log(`✅ [${exp.id}] Cutout already exists.`);
            continue;
        }

        console.log(`⏳ Processing [${exp.id}] ${exp.label}...`);

        try {
            // Using bria/remove-background for automated high-quality removal
            const output = await replicate.run(
                "lucataco/remove-bg:95fcc2a548ee2009d1a5f190bc774d65104a300c410bc3970fd6eccfb339bba7",
                {
                    input: {
                        image: fs.readFileSync(exp.rawImageUrl).toString('base64'),
                    }
                }
            );

            const fileName = `${exp.id}_cutout.png`;
            const targetPath = path.join(CUTOUT_DIR, fileName);

            await downloadImage(output, targetPath);

            exp.cutoutUrl = targetPath;
            exp.processedAt = new Date().toISOString();

            fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
            console.log(`✨ Successfully created cutout: ${targetPath}`);

        } catch (error) {
            console.error(`❌ Failed to process [${exp.id}]:`, error.message);
        }
    }

    console.log("🎉 Cutout Pipeline finished!");
}

processCutouts().catch(console.error);
