# Agent Skill Template Analysis - better-icons

**Source:** https://github.com/better-auth/better-icons  
**Live:** https://skills.sh/better-auth/better-icons/better-icons

---

## Why This Skill Is Excellent

1. **Solves a real problem** - Icons are a pain point in AI-assisted coding
2. **Multiple interfaces** - CLI, MCP server, Agent Skills
3. **Great UX** - Interactive setup, auto-learning preferences
4. **Token efficient** - Syncs to project files instead of pasting SVG in chat
5. **Well documented** - Clear README, examples, API reference
6. **Published everywhere** - npm, skills.sh, GitHub

---

## Structure Breakdown

### Core Files (What We Know)

```
better-icons/
├── package.json          # npm package
├── README.md             # Main documentation
├── SKILL.md              # Agent Skills spec (assumed)
├── src/
│   ├── cli.ts            # CLI interface
│   ├── mcp-server.ts     # MCP server for AI agents
│   ├── tools/            # Individual MCP tools
│   └── iconify-api.ts    # API wrapper for Iconify
└── bin/
    └── better-icons      # CLI executable
```

### What Makes It Good

#### 1. Multiple User Interfaces

**CLI (Direct Usage):**
```bash
better-icons search arrow
better-icons get lucide:home > icon.svg
better-icons get mdi:account --color '#333' --size 24
```

**MCP Server (AI Agents):**
- Integrates with Cursor, Claude Code, Windsurf, etc.
- AI can call tools directly
- Reduces token usage

**Agent Skills:**
```bash
npx add-skill better-auth/better-icons
```

**Lesson:** Build multiple interfaces to reach different users.

#### 2. Rich Tool Set (10+ MCP Tools)

1. `search_icons` - Search across collections
2. `get_icon` - Retrieve single icon
3. `get_icons` - Batch retrieval
4. `list_collections` - Browse libraries
5. `recommend_icons` - Smart recommendations
6. `find_similar_icons` - Find variations
7. `sync_icon` - Add to project file
8. `scan_project_icons` - List existing icons
9. `get_recent_icons` - Recently used
10. `get_icon_preferences` - Usage stats
11. `clear_icon_preferences` - Reset preferences

**Lesson:** Provide comprehensive tools, not just one.

#### 3. Smart Features

**Auto-Learning:**
- Remembers which collections you use
- Prioritizes them in future searches
- Reduces friction over time

**Project Sync:**
- Writes icons directly to project files
- Saves tokens (no SVG in chat)
- Maintains consistency

**Batch Operations:**
- Get multiple icons at once
- Efficient for larger projects

**Lesson:** Add smart features that improve UX over time.

#### 4. Clear Documentation

**README Structure:**
- Quick Start (get people using it FAST)
- Why? (explain the problem)
- Features (what makes it special)
- Manual Installation (for each agent)
- MCP Tools Reference (every tool documented)
- CLI Reference (every command documented)
- Popular Collections (helpful context)

**Lesson:** Document everything, but make it scannable.

#### 5. Interactive Setup

```bash
better-icons setup
# Interactive wizard:
# - Which agents do you use?
# - Global or project scope?
# - Auto-configures everything
```

**Lesson:** Reduce friction with interactive setup.

---

## Template for Your Skills

### File Structure

```
your-skill/
├── SKILL.md              # Agent Skills spec (required)
├── README.md             # GitHub marketing page
├── package.json          # npm package (if applicable)
├── scripts/              # Executable scripts
│   ├── setup.sh          # Installation script
│   └── main-tool.js      # Primary functionality
├── references/           # Documentation
│   ├── SETUP.md          # Installation guide
│   ├── EXAMPLES.md       # Usage examples
│   ├── API.md            # API reference
│   └── TROUBLESHOOTING.md
└── assets/               # Static resources
    └── templates/        # Templates, configs, etc.
```

### SKILL.md Template

```markdown
---
name: your-skill-name
description: Clear, keyword-rich description of what it does and when to use it (max 1024 chars)
license: MIT
compatibility: Node.js 18+, requires XYZ
metadata:
  author: alternative-design
  version: "1.0.0"
  category: your-category
  tags: keyword1 keyword2 keyword3
---

# Skill Name

Brief intro - what problem does this solve?

## Quick Start

### Installation
\`\`\`bash
npx skills add alternative-design/your-skill
\`\`\`

### Basic Usage
\`\`\`bash
your-command [options]
\`\`\`

## Features

- Feature 1
- Feature 2
- Feature 3

## Commands

### Command 1
Description and example

### Command 2
Description and example

## Advanced Usage

[Link to references/EXAMPLES.md]

## Troubleshooting

[Link to references/TROUBLESHOOTING.md]

## Support

- Issues: https://github.com/alternative-design/your-skill/issues
- Discussions: https://github.com/alternative-design/your-skill/discussions
```

### README.md Template

```markdown
# Your Skill Name

> One-line pitch

[![License](badge)](link)
[![Agent Skills](badge)](link)

![Hero Image]

## ✨ Features

- Feature 1
- Feature 2
- Feature 3

## 🚀 Quick Start

### Installation
\`\`\`bash
npx skills add alternative-design/your-skill
\`\`\`

### Usage
\`\`\`bash
your-command
\`\`\`

## 📖 Documentation

- [Setup Guide](references/SETUP.md)
- [Examples](references/EXAMPLES.md)
- [API Reference](references/API.md)
- [Troubleshooting](references/TROUBLESHOOTING.md)

## 💡 Use Cases

### Use Case 1
Description

### Use Case 2
Description

## 🛠️ Requirements

- Requirement 1
- Requirement 2

## 💰 Cost Breakdown

- Setup: $X
- Per use: $Y

## 📦 What You Get

- Thing 1
- Thing 2

## 🤝 Contributing

We welcome contributions!

## 📄 License

MIT

## 🙏 Credits

Created by Alternative Design
Powered by [Technology]

## 🔗 Links

- Documentation
- Issues
- Discussions
```

---

## Key Takeaways for Your Skills

### 1. Solve a Real Problem
- better-icons: "Icons are a pain point in AI coding"
- remotion-thumbnail: "Generate pro thumbnails at scale"
- Your next skill: What problem does it solve?

### 2. Multiple Interfaces
- CLI for direct use
- MCP for AI agents
- Skills for ecosystem

### 3. Rich Functionality
- Don't just do one thing
- Provide search, get, batch, recommend, etc.
- Think about the full workflow

### 4. Smart Features
- Auto-learning
- Preferences
- Recent items
- Batch operations

### 5. Great Documentation
- Quick start (get them using it fast)
- Why it exists
- Full reference
- Examples
- Troubleshooting

### 6. Easy Installation
- Interactive setup
- Auto-configuration
- Clear manual instructions

### 7. Token Efficiency
- Sync to files instead of chat
- Batch operations
- Smart caching

---

## Your Next Skills - Ideas

### 1. Alternative Design Video Workflow Skill
**Problem:** Video editors waste time on repetitive export/render settings

**Features:**
- Preset export settings
- Batch render
- Format optimization
- Project templates

**Tools:**
- `create_project` - Set up video project structure
- `export_preset` - Apply render settings
- `batch_render` - Render multiple videos
- `optimize_format` - Convert/compress videos

### 2. Client Brief Analyzer Skill
**Problem:** Extracting requirements from client briefs is tedious

**Features:**
- Parse client briefs
- Extract deliverables
- Timeline estimation
- Scope analysis

**Tools:**
- `analyze_brief` - Parse brief document
- `extract_deliverables` - List all deliverables
- `estimate_timeline` - Calculate project duration
- `detect_scope_creep` - Flag unclear requirements

### 3. Brand Asset Generator Skill
**Problem:** Maintaining brand consistency across assets is hard

**Features:**
- Logo variations
- Social media templates
- Brand guideline enforcement
- Asset export

**Tools:**
- `generate_variations` - Create logo variations
- `apply_brand_colors` - Apply brand palette
- `create_social_assets` - Generate social media graphics
- `validate_brand` - Check brand compliance

---

## Action Items

### For remotion-thumbnail (Current Skill)
- ✅ Structure is good
- ✅ Documentation is comprehensive
- ⏳ Add example thumbnails (you do this)
- ⏳ Create demo video (optional)
- ⏳ Submit to skills.sh

### For Next Skill
- Study better-icons structure
- Plan feature set (10+ tools if MCP)
- Build CLI first
- Add MCP server (optional)
- Comprehensive docs from day 1

### General
- Every skill should have:
  - Clear problem statement
  - Quick start (< 1 minute to first use)
  - Multiple examples
  - Full reference docs
  - Troubleshooting guide
  - Link to support channels

---

**Date:** 2026-01-28  
**Analysis of:** better-icons by better-auth  
**For:** Alternative Design Skills Development
