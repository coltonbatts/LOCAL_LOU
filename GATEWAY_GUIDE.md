# Gateway Troubleshooting Guide

## Understanding the Gateway

**What is it?**
The Clawdbot gateway is a local server that manages:
- Your chat sessions (keeps state between messages)
- Model connections (Ollama, Claude API, etc.)
- Authentication tokens (so only you can access it)

**Where it runs:**
- Port: `18789`
- Bind: `127.0.0.1` (localhost only - security feature)
- PID: Check with `clawdbot gateway status`

**Why "tokenized" sessions?**
Each browser window gets a unique session token. This is by design - prevents session hijacking. Only the window that started the chat can continue it.

---

## Common Issues & Fixes

### 1. "Gateway won't start" or stuck in start/stop loop

**Symptoms:**
- `gateway start` says it's starting but nothing happens
- Can't connect to http://localhost:18789
- Model not responding

**Fix:**
```bash
# Force kill any stuck processes
pkill -9 -f clawdbot

# Check if port is blocked
lsof -i :18789

# If something's using port 18789, kill it:
kill -9 <PID>

# Start fresh
clawdbot gateway start

# Verify it's actually running
clawdbot gateway status
```

### 2. "Model not connecting" / "Ollama not responding"

**Symptoms:**
- Gateway is running but model doesn't respond
- "Failed to connect to model" errors

**Fix:**
```bash
# Check if Ollama is actually running
ollama list

# If not, start it manually first
ollama serve

# In another terminal, verify the model exists
ollama list | grep qwen

# If missing, pull it again
ollama pull qwen2.5:72b-instruct-q4_K_M

# Restart gateway AFTER Ollama is confirmed running
clawdbot gateway restart
```

### 3. "New window won't connect"

**Symptoms:**
- Original window works fine
- New tab/window shows disconnected

**Why:**
Session tokens are per-window by design. This is actually correct behavior.

**Solution:**
Use the original window, or start a fresh session with `/new`

---

## Proper Startup Sequence

**When Mac restarts or gateway is down:**

```bash
# 1. Start Ollama first (if not auto-starting)
ollama serve &

# 2. Wait 2 seconds for Ollama to initialize
sleep 2

# 3. Start Clawdbot gateway
clawdbot gateway start

# 4. Verify everything
clawdbot status

# 5. Open browser to http://localhost:18789
```

---

## Diagnostic Commands

**Check if gateway is alive:**
```bash
clawdbot gateway status
```

**See live logs (watch for errors):**
```bash
clawdbot logs --follow
```

**Full system check:**
```bash
clawdbot status
```

**Check Ollama status:**
```bash
ollama list
curl http://localhost:11434/api/tags
```

**Nuclear option (complete reset):**
```bash
# Stop everything
clawdbot gateway stop
pkill -9 ollama

# Start clean
ollama serve &
sleep 2
clawdbot gateway start
```

---

## What's Normal vs. Broken

✅ **Normal:**
- Gateway takes 2-5 seconds to start
- Session tokens expire after inactivity
- Need to keep one window open for continuity
- Ollama takes a moment to load model first time

❌ **Broken:**
- Gateway status says "running" but can't connect
- Start command hangs forever
- Model responds in one session but not another with same model
- Port 18789 shows "connection refused"

---

## LaunchAgent (Auto-start on boot)

**Check if auto-start is enabled:**
```bash
launchctl list | grep clawdbot
```

**Disable auto-start:**
```bash
clawdbot gateway stop
launchctl unload ~/Library/LaunchAgents/com.clawdbot.gateway.plist
```

**Re-enable auto-start:**
```bash
launchctl load ~/Library/LaunchAgents/com.clawdbot.gateway.plist
clawdbot gateway start
```

---

## Security Notes

**Why localhost only?**
`bind=loopback` means ONLY your machine can connect. This prevents random people on your network from accessing your AI.

**The auth token:**
Stored in `~/.clawdbot/clawdbot.json` - don't share this file publicly.

**If you see "1 critical" security warning:**
That's about model size. Qwen 2.5 72B is flagged as "small" (<300B params). You can ignore this for local use, or enable sandboxing if paranoid:
```bash
clawdbot config --set agents.defaults.sandbox.mode=all
```

---

## TL;DR - Quick Fix Checklist

When something's broken:
1. ☐ Is Ollama running? (`ollama list`)
2. ☐ Is gateway running? (`clawdbot gateway status`)
3. ☐ Can you connect to http://localhost:18789?
4. ☐ Check logs: `clawdbot logs --follow`
5. ☐ Nuclear option: kill everything, start Ollama first, then gateway

---

**Last updated:** 2026-01-27
**Model:** Qwen 2.5 72B (ollama:local/qwen2.5:72b)
**Gateway Port:** 18789
**Config:** ~/.clawdbot/clawdbot.json
