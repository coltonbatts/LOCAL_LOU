# LOCAL-ONLY MODE - ENABLED

**Date:** 2026-01-28  
**Reason:** Hit 95% of Claude API usage  

## Configuration Change

**Before:**
```json
{
  "primary": "ollama:local/qwen2.5:72b",
  "fallbacks": ["anthropic/claude-sonnet-4-5"]
}
```

**After:**
```json
{
  "primary": "ollama:local/qwen2.5:72b",
  "fallbacks": []
}
```

## What This Means

✅ **Qwen 2.5 72B (local) ONLY**  
❌ **No Claude fallback**  
💰 **Zero API costs**  
🚀 **Unlimited usage**  

## When to Use Claude (Emergency Only)

**Manual override only:**
```bash
/model sonnet
```

**Use ONLY when:**
- Extremely complex reasoning required
- Qwen fails repeatedly
- Mission-critical task
- Budget allows

**After emergency use:**
```bash
/model local
```

## Current Status

**Active model:** Qwen 2.5 72B (local)  
**Fallback:** NONE  
**Cost:** $0/message  
**Limit:** Hardware only (RAM/CPU)  

## Restart Gateway to Apply

Gateway restart is disabled in config. To apply fallback removal:

```bash
# Option 1: Manual restart
docker restart clawdbot-gateway

# Option 2: Enable restart command (if needed)
# Edit ~/.clawdbot/clawdbot.json
# Set "commands.restart": true
# Then: clawdbot gateway restart
```

## Philosophy

**Build everything on local model first.**  
Only use Claude when local absolutely cannot do it.  
This forces us to optimize for local AI and stay cost-free.

---

**Remember:** Unlimited creativity > expensive API calls
