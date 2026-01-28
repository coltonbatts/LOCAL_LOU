# LOCAL_LOU 🏄

**Unlimited local AI assistant powered by Qwen 2.5 72B**

This is Lou's workspace - a fully configured Clawdbot setup running 100% locally with zero API costs.

---

## What's Running

- **Model:** Qwen 2.5 72B (47GB, quantized) via Ollama
- **Fallback:** Claude Sonnet 4.5 for complex reasoning
- **Cost:** $0 per message (local inference)
- **Speed:** Fast as hell (local = no API latency)
- **Gateway:** http://localhost:18789

---

## Quick Start

**Access Lou:**
```bash
# Make sure gateway is running
clawdbot gateway status

# If not running, start it
clawdbot gateway start

# Open in browser
open http://localhost:18789
```

**Or bookmark:** `http://localhost:18789` for one-click access

---

## Important Files

- **`GATEWAY_GUIDE.md`** - Troubleshooting & how the gateway works (READ THIS IF STUCK!)
- **`backups/clawdbot-config/RESTORE.md`** - How to restore if something breaks
- **`AGENTS.md`** - How Lou operates (daily routines, memory, behavior)
- **`SOUL.md`** - Lou's personality and core values
- **`USER.md`** - Info about Colton (you)
- **`IDENTITY.md`** - Lou's identity (name, emoji, vibe)

---

## Common Issues

### Gateway won't start / stuck in loop

```bash
# Nuclear option - kill everything and restart
pkill -9 -f clawdbot
ollama serve &
sleep 2
clawdbot gateway start
```

### Model not responding

```bash
# Check Ollama is running
ollama list

# If not, start it
ollama serve &

# Then restart gateway
clawdbot gateway restart
```

### New browser window won't connect

**This is normal.** Session tokens are per-window (security feature). 

**Solution:** Keep your original window open, or start fresh with `/new` in the original window.

**Full troubleshooting:** See `GATEWAY_GUIDE.md`

---

## How It Works

**Session Tokens:**
Each browser window gets a unique session token. This prevents session hijacking. Only the window that started the chat can continue it. This is why the homepage doesn't work - sessions are tied to the window, not just the port.

**Gateway:**
- Runs on `localhost:18789` (loopback only - no external access)
- Manages sessions, model connections, and auth
- Auto-starts on boot via LaunchAgent

**Ollama:**
- Local LLM server running on `localhost:11434`
- Hosts the Qwen 2.5 72B model
- Must be running BEFORE starting Clawdbot gateway

**Startup Order:**
1. Ollama starts first
2. Wait for it to initialize (~2 seconds)
3. Then start Clawdbot gateway

---

## Proper Startup Sequence

**When Mac restarts or gateway is down:**

```bash
# 1. Start Ollama
ollama serve &

# 2. Wait for it to initialize
sleep 2

# 3. Start Clawdbot
clawdbot gateway start

# 4. Verify
clawdbot status

# 5. Open browser
open http://localhost:18789
```

---

## Backup & Restore

**Config is backed up** in `backups/clawdbot-config/`

**To restore after system failure:**
1. Follow instructions in `backups/clawdbot-config/RESTORE.md`
2. Reinstall Ollama if needed
3. Pull Qwen 2.5 72B model (47GB download)
4. Restore config file
5. Restart gateway

**Everything is in this repo** - if you lose your machine, clone this repo and follow RESTORE.md.

---

## Useful Commands

**Check status:**
```bash
clawdbot status              # Full system check
clawdbot gateway status      # Just gateway
ollama list                  # See installed models
```

**Logs (for debugging):**
```bash
clawdbot logs --follow       # Live tail of gateway logs
```

**Restart gateway:**
```bash
clawdbot gateway restart
```

**Switch models in session:**
```bash
/model local                 # Use Qwen 2.5 72B
/model sonnet                # Use Claude Sonnet 4.5
```

---

## What Makes This Special

✅ **Zero API costs** - unlimited creativity without burning money  
✅ **Privacy** - everything stays on your machine  
✅ **Speed** - no API roundtrips  
✅ **Fully backed up** - config + instructions in this repo  
✅ **Dual models** - local for speed, Claude for complexity  

**This unlocks:**
- Prototype without financial anxiety
- Build AI-powered tools at zero marginal cost
- Learn, experiment, iterate freely
- Use AI assistance for Alternative Design work without limits

---

## Next Steps

1. **Bookmark** `http://localhost:18789` for quick access
2. **Read** `GATEWAY_GUIDE.md` to understand how it works
3. **Build** something - you've got unlimited AI now 🚀

---

## Technical Details

**Hardware:** Mac Studio (M2/M3 Ultra recommended for 72B model)  
**Software:** 
- Clawdbot 2026.1.24-3
- Ollama (latest)
- Node.js 23.11.0

**Model:** Qwen 2.5 72B Instruct (q4_K_M quantization, 47GB)  
**Context window:** 32,768 tokens  
**Max output:** 8,192 tokens  

**Config location:** `~/.clawdbot/clawdbot.json`  
**Workspace:** `/Users/coltonbatts/clawd`  

---

## Security

**⚠️ NEVER commit API keys or secrets to GitHub!**

See **`SECURITY.md`** for full guidelines on:
- What never to commit
- How to rotate keys safely
- Incident response protocol
- Best practices

The `.gitignore` file protects most sensitive files, but always double-check before pushing.

---

## Support

- **Clawdbot docs:** https://docs.clawd.bot
- **Discord:** https://discord.com/invite/clawd
- **GitHub (this repo):** https://github.com/coltonbatts/LOCAL_LOU

---

**Built by Colton Batts**  
**Powered by Clawdbot + Ollama**  
**Model: Qwen 2.5 72B**  
**Last updated: 2026-01-27**
