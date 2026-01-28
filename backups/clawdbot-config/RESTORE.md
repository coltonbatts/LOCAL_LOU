# Clawdbot + Ollama Setup Restoration Guide

## What You Have Running
- **Clawdbot** (AI assistant framework)
- **Ollama** (local LLM server)
- **Qwen 2.5 72B** (local model - 47GB, quantized q4_K_M)

## If You Need to Restore

### 1. Restore Ollama Models
```bash
# Check if Ollama is installed
ollama --version

# If not, install:
brew install ollama

# Pull the model again (it's big - 47GB download)
ollama pull qwen2.5:72b-instruct-q4_K_M
```

### 2. Restore Clawdbot Config

**Note:** Config backups are NOT stored in git (they contain API keys).

**Option A - Rebuild via wizard:**
```bash
# Run the setup wizard
clawdbot wizard onboard

# Follow prompts to configure:
# - Ollama provider: http://localhost:11434/v1
# - Model: qwen2.5:72b
# - Set as default model
# - Add Claude Sonnet 4.5 as fallback (if you have API key)
```

**Option B - Restore from local backup:**
```bash
# If you have a LOCAL backup (not in git)
cp ~/clawd/backups/clawdbot-config/clawdbot-backup-YYYYMMDD.json ~/.clawdbot/clawdbot.json

# Restart Clawdbot
clawdbot gateway restart
```

**Option C - Manual config:**
Edit `~/.clawdbot/clawdbot.json` and add the Ollama provider:
```json
{
  "models": {
    "providers": {
      "ollama:local": {
        "baseUrl": "http://localhost:11434/v1",
        "api": "openai-completions",
        "models": [{
          "id": "qwen2.5:72b",
          "name": "Qwen 2.5 72B Local",
          "contextWindow": 32768,
          "maxTokens": 8192,
          "cost": {"input": 0, "output": 0}
        }]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "ollama:local/qwen2.5:72b"
      }
    }
  }
}
```

### 3. Verify It's Working
```bash
# Check Ollama is running
ollama list

# Start Clawdbot
clawdbot gateway start

# Check status
clawdbot gateway status
```

## Key Configuration Details

**Ollama:**
- Running on: `http://localhost:11434/v1`
- Model: `qwen2.5:72b` (47GB)
- Context window: 32,768 tokens
- Max output: 8,192 tokens
- Cost: $0 (local)

**Clawdbot:**
- Workspace: `/Users/coltonbatts/clawd`
- Primary model: `ollama:local/qwen2.5:72b` (alias: `local`)
- Fallback: `anthropic/claude-sonnet-4-5` (alias: `sonnet`)
- Gateway port: 18789
- Auth token: stored in config

## Important Files
- Config: `~/.clawdbot/clawdbot.json`
- Workspace: `~/clawd/`
- Ollama models: `~/.ollama/models/`

## If Something Breaks

1. Check Ollama is running: `ollama list`
2. Check Clawdbot status: `clawdbot gateway status`
3. Check logs: `clawdbot gateway logs`
4. Restart everything:
   ```bash
   ollama serve  # in one terminal
   clawdbot gateway restart  # in another
   ```

## Backup Created
Date: $(date +%Y-%m-%d)
Config backup: `~/clawd/backups/clawdbot-config/`

---

**Don't lose this file!** It's your recovery key.
