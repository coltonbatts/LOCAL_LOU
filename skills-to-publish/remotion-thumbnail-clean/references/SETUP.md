# Complete Setup Guide

Step-by-step guide to get up and running with the Remotion Thumbnail skill.

## Prerequisites

### Required

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm/npx** - Comes with Node.js
- **Replicate API key** - [Get one here](https://replicate.com) (free tier available)
- **Camera** - Webcam, phone camera, or DSLR

### Optional (but recommended)

- **Good lighting** - Ring light, softbox, or natural window light
- **Tripod or stable surface** - For consistent framing
- **Photo editing software** - For touch-ups (optional)

## Installation Steps

### 1. Install the Skill

If using an Agent Skills-compatible tool, install via:

```bash
npx skills add alternative-design/remotion-thumbnail
```

Or clone manually:

```bash
git clone https://github.com/alternative-design/remotion-thumbnail.git
cd remotion-thumbnail
```

### 2. Install Renderer Dependencies

```bash
cd renderer
npm install
```

This will install:
- Remotion (rendering engine)
- React (UI framework)
- Replicate SDK (for AI background removal)
- TypeScript (type checking)

**Time:** 1-2 minutes

### 3. Get Your Replicate API Key

1. Go to [replicate.com](https://replicate.com)
2. Sign up (free tier available)
3. Go to Account → API Tokens
4. Copy your API token

### 4. Set Environment Variable

**macOS/Linux:**
```bash
export REPLICATE_API_TOKEN="your-token-here"
```

**Windows (PowerShell):**
```powershell
$env:REPLICATE_API_TOKEN="your-token-here"
```

**Permanent setup (recommended):**

Add to your `.bashrc`, `.zshrc`, or `.bash_profile`:
```bash
export REPLICATE_API_TOKEN="your-token-here"
```

Then reload:
```bash
source ~/.zshrc  # or ~/.bashrc
```

### 5. Verify Installation

```bash
# Check Node version
node --version  # Should be 18+

# Check Replicate token
echo $REPLICATE_API_TOKEN  # Should show your token

# Check renderer
cd renderer
npx remotion --version  # Should show Remotion version
```

## First Run Walkthrough

### Phase 1: Capture Your Expressions (~30 minutes)

1. **Set up your capture space:**
   - Plain background (white/gray wall ideal)
   - Good, even lighting
   - Camera at eye level
   - Tripod or stable surface

2. **Run the capture script:**
   ```bash
   cd <skill-dir>
   node scripts/capture.js
   ```

3. **Follow the prompts:**
   - Script will tell you which expression to capture
   - It will tell you the exact file path to save to
   - Take the photo with your camera
   - Transfer to the specified path
   - Press ENTER to continue

4. **Tips during capture:**
   - Use timer or remote shutter to avoid camera shake
   - Take 2-3 shots per expression, keep the best
   - Exaggerate slightly (thumbnails are small)
   - Keep consistent framing

**Output:** 25 photos in `storage/raw/` + metadata in `storage/expressions_db.json`

### Phase 2: Generate Cutouts (~10-15 minutes)

1. **Run the cutout processor:**
   ```bash
   node scripts/process_cutouts.js
   ```

2. **What happens:**
   - Script reads all your raw photos
   - Sends each to Replicate's background removal AI
   - Downloads the cutout PNG
   - Updates the database

3. **Watch the progress:**
   ```
   ✂️ Starting Cutout Pipeline...
   ⏳ Processing [1] Neutral...
   ✨ Successfully created cutout: storage/cutouts/1_cutout.png
   ⏳ Processing [2] Happy/Smiling...
   ✨ Successfully created cutout: storage/cutouts/2_cutout.png
   ...
   ```

**Time:** ~30-60 seconds per expression (25 total = ~10-15 min)

**Output:** 25 cutouts in `storage/cutouts/`

### Phase 3: Generate Your First Thumbnail

1. **Choose your expression** (e.g., #5 - Surprised)

2. **Generate:**
   ```bash
   npx remotion still Thumbnail renderer/out/thumbnail.png \
     --props='{
       "headline": "This Changed EVERYTHING!",
       "emotionId": 5,
       "stylePreset": "bold",
       "cutoutUrl": "storage/cutouts/5_cutout.png",
       "bgUrl": "https://source.unsplash.com/1920x1080/?technology"
     }'
   ```

3. **Check your output:**
   ```bash
   open renderer/out/thumbnail.png
   ```

**Boom.** You've got a professional YouTube thumbnail. 🎉

## Recommended Workflow

### One-Time Setup (Done Once)
1. ✅ Install skill + dependencies
2. ✅ Get Replicate API key
3. ✅ Capture 25 expressions
4. ✅ Generate cutouts

**Total time:** ~1 hour

### Ongoing Use (Per Thumbnail)
1. Think of headline
2. Choose expression (1-25)
3. Pick/generate background
4. Run render command (5 seconds)

**Time per thumbnail:** < 1 minute

## Folder Structure After Setup

```
remotion-thumbnail/
├── SKILL.md
├── scripts/
│   ├── capture.js
│   └── process_cutouts.js
├── references/
│   ├── SETUP.md (this file)
│   ├── EXPRESSIONS.md
│   ├── BATCH_GENERATION.md
│   └── TROUBLESHOOTING.md
├── assets/
│   └── expressions.json
├── renderer/
│   ├── node_modules/        # ← After npm install
│   ├── out/                 # ← Generated thumbnails go here
│   ├── src/
│   └── package.json
└── storage/                 # ← Created during capture
    ├── raw/                 # Your 25 raw photos
    ├── cutouts/             # Your 25 cutouts
    └── expressions_db.json  # Expression metadata
```

## Cost Breakdown

### One-Time Costs
- **Replicate (cutout generation):** ~$0.25 total for 25 cutouts (first run only)
- **Time:** ~1 hour setup

### Per-Thumbnail Costs
- **Remotion rendering:** FREE (local rendering)
- **Time:** < 1 minute
- **Replicate:** $0 (cutouts are reusable)

**Result:** After initial setup, unlimited thumbnails at zero cost.

## Next Steps

1. ✅ Complete setup (you're here!)
2. Read [EXPRESSIONS.md](EXPRESSIONS.md) for expression tips
3. Generate your first thumbnail
4. See [BATCH_GENERATION.md](BATCH_GENERATION.md) for automation
5. Customize the renderer (optional)

## Getting Help

**Common issues?** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Questions?** 
- GitHub Issues: https://github.com/alternative-design/remotion-thumbnail/issues
- Discussions: https://github.com/alternative-design/remotion-thumbnail/discussions

**Share your thumbnails!**
Tag us on Twitter: [@alternativedesign](https://twitter.com/alternativedesign)

---

**Pro tip:** Do your expression capture session when you're well-rested and in good light. These photos become your thumbnail library for life - quality matters!
