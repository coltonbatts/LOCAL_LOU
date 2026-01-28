const fs = require('fs');
const path = require('path');
const readline = require('readline');

const BASE_DIR = __dirname;
const ASSETS_DIR = path.join(BASE_DIR, '../assets');
const STORAGE_DIR = path.join(BASE_DIR, '../storage');
const RAW_DIR = path.join(STORAGE_DIR, 'raw');
const DB_PATH = path.join(STORAGE_DIR, 'expressions_db.json');
const EXPRESSIONS_PATH = path.join(ASSETS_DIR, 'expressions.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    console.log("🚀 Welcome to the ReMotion Expression Capture Tool!");

    if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });

    const expressions = JSON.parse(fs.readFileSync(EXPRESSIONS_PATH, 'utf8'));
    let db = { userId: 'default_user', expressions: [] };
    if (fs.existsSync(DB_PATH)) {
        db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    }

    for (const exp of expressions) {
        const existing = db.expressions.find(e => e.id === exp.id);
        if (existing && existing.rawImageUrl) {
            console.log(`✅ [${exp.id}] ${exp.label} already captured.`);
            continue;
        }

        console.log(`\n📸 Next Expression: [${exp.id}] ${exp.label}`);
        console.log(`   Please take a photo and save it to:`);
        const fileName = `${exp.id}_${exp.label.replace(/\s+/g, '_').toLowerCase()}.jpg`;
        const targetPath = path.join(RAW_DIR, fileName);
        console.log(`   👉 ${targetPath}`);

        await new Promise(resolve => {
            rl.question(`   Press [ENTER] once you have saved the photo to the path above...`, () => {
                if (fs.existsSync(targetPath)) {
                    console.log(`   ✨ Captured!`);
                    db.expressions.push({
                        id: exp.id,
                        label: exp.label,
                        rawImageUrl: targetPath,
                        createdAt: new Date().toISOString()
                    });
                    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
                    resolve();
                } else {
                    console.log(`   ⚠️  File not found at ${targetPath}. Please try again.`);
                    // Simple retry logic
                    return main();
                }
            });
        });
    }

    console.log("\n🎉 All expressions captured! Run Phase 3 to generate cutouts.");
    rl.close();
}

main().catch(console.error);
