# Remotion Thumbnail Generator

> Generate professional YouTube thumbnails with AI-powered expression cutouts and Remotion rendering.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Agent Skills](https://img.shields.io/badge/Agent-Skills-blue.svg)](https://agentskills.io)
[![Remotion](https://img.shields.io/badge/Powered%20by-Remotion-purple.svg)](https://remotion.dev)

![Example Thumbnails](https://via.placeholder.com/1200x400/6366f1/ffffff?text=Thumbnail+Examples+Coming+Soon)

---

## ✨ Features

- **25 Preset Expressions** - Capture once, use forever
- **AI Background Removal** - Powered by Replicate
- **3 Style Presets** - Bold, Dramatic, Clean
- **Batch Generation** - Create unlimited variations
- **Zero Ongoing Costs** - Local rendering with Remotion
- **Agent Skills Compatible** - Works across 20+ AI coding assistants

---

## 🚀 Quick Start

### Installation

```bash
npx skills add alternative-design/remotion-thumbnail
```

Or clone directly:

```bash
git clone https://github.com/alternative-design/remotion-thumbnail.git
cd remotion-thumbnail
cd renderer && npm install
```

### Setup (One Time - ~1 hour)

1. **Get Replicate API key** (free tier available):
   ```bash
   export REPLICATE_API_TOKEN="your-token-here"
   ```

2. **Capture your 25 expressions:**
   ```bash
   node scripts/capture.js
   ```

3. **Generate cutouts:**
   ```bash
   node scripts/process_cutouts.js
   ```

### Generate Your First Thumbnail

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

**Result:** Professional thumbnail in seconds! 🎉

---

## 📖 Documentation

- **[Complete Setup Guide](references/SETUP.md)** - Step-by-step installation
- **[Expression Reference](references/EXPRESSIONS.md)** - All 25 expressions + tips
- **[Batch Generation](references/BATCH_GENERATION.md)** - Automate multiple thumbnails
- **[Troubleshooting](references/TROUBLESHOOTING.md)** - Common issues & solutions
- **[SKILL.md](SKILL.md)** - Agent Skills specification

---

## 🎨 Style Presets

### Bold
Vibrant colors, strong contrast, dynamic composition  
**Best for:** Gaming, entertainment, reaction content

### Dramatic
Moody lighting, cinematic feel, subdued colors  
**Best for:** Documentaries, serious topics, storytelling

### Clean
Minimal design, soft colors, professional look  
**Best for:** Educational, business, tutorials

---

## 🎭 Expression Library

25 preset expressions covering all YouTube content types:

| Expression | Best For | Expression | Best For |
|------------|----------|------------|----------|
| Neutral | Professional content | Happy/Smiling | Positive topics |
| Laughing | Comedy | Surprised | Big reveals |
| Shocked | Dramatic reactions | Angry | Rant videos |
| Thinking | Problem-solving | Wink | Insider tips |
| Pointing | Directions | Thumbs Up | Recommendations |
| Mind Blown | Amazing facts | Heroic | Motivational |

[See full list with usage tips →](references/EXPRESSIONS.md)

---

## 💡 Use Cases

### Content Creators
- Generate consistent thumbnails across your channel
- A/B test different styles and expressions
- Create variations in seconds

### Video Editors
- Bulk generate thumbnails for clients
- Maintain brand consistency
- Speed up production workflow

### Marketing Teams
- Test headline variations
- Match thumbnails to campaign themes
- Scale thumbnail production

---

## 🏗️ Architecture

```
remotion-thumbnail/
├── SKILL.md              # Agent Skills specification
├── scripts/
│   ├── capture.js        # Interactive expression capture
│   └── process_cutouts.js # AI background removal
├── references/           # Detailed documentation
├── renderer/             # Remotion project
└── storage/              # Your expressions (generated)
```

**Agent Skills compatible** - works with Claude Code, Cursor, Windsurf, Cline, and 20+ other AI coding assistants.

---

## 💰 Cost Breakdown

### One-Time Setup
- Replicate API (25 cutouts): **~$0.25**
- Time investment: **~1 hour**

### Per Thumbnail
- Rendering: **$0** (local)
- Time: **<1 minute**

**Result:** Unlimited thumbnails at zero ongoing cost.

---

## 🛠️ Requirements

- Node.js 18+
- Replicate API key ([get one free](https://replicate.com))
- Camera (webcam, phone, or DSLR)

---

## 📦 What You Get

✅ **Scripts:** Automated capture + cutout generation  
✅ **Renderer:** Full Remotion project (customizable)  
✅ **Documentation:** Complete guides for every use case  
✅ **Examples:** Batch generation, automation, integration  
✅ **Support:** Active GitHub issues + discussions  

---

## 🌟 Examples

### Basic Generation
```bash
npx remotion still Thumbnail out/thumb.png \
  --props='{"headline":"Amazing!","emotionId":5,"stylePreset":"bold",...}'
```

### Batch Processing
```bash
# Generate 10 variations at once
./scripts/batch_from_csv.sh
```

### Integration
```javascript
// Notion, Airtable, YouTube upload workflows
// See references/BATCH_GENERATION.md for examples
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ideas for contributions:**
- New style presets
- Additional expressions
- Integration examples
- Renderer improvements

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

**TL;DR:** Use it however you want. Commercial use OK. Attribution appreciated but not required.

---

## 🙏 Credits

**Created by:** [Alternative Design](https://github.com/alternative-design)  
**Powered by:** [Remotion](https://remotion.dev) | [Replicate](https://replicate.com)  
**Part of:** [Agent Skills](https://agentskills.io) ecosystem

---

## 🔗 Links

- **Documentation:** [references/](references/)
- **Issues:** [GitHub Issues](https://github.com/alternative-design/remotion-thumbnail/issues)
- **Discussions:** [GitHub Discussions](https://github.com/alternative-design/remotion-thumbnail/discussions)
- **Website:** Coming soon!

---

## ⭐ Support

If this skill helped you, consider:
- ⭐ Starring the repo
- 🐦 Sharing on Twitter (tag [@alternativedesign](https://twitter.com/alternativedesign))
- 💬 Sharing your thumbnails in [Discussions](https://github.com/alternative-design/remotion-thumbnail/discussions)

---

**Made with ❤️ for content creators worldwide**

*Generate once. Use forever. Scale infinitely.*
