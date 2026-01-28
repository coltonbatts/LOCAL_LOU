# How Context & Memory Work with Local Models

**Simple explanation of how Clawdbot handles context with Qwen 2.5 72B**

---

## The Basics

### Context Window = What the Model Sees RIGHT NOW

**Your current session:**
- Model: Qwen 2.5 72B (or Claude Sonnet 4.5)
- Context window: 200,000 tokens (Qwen) or 1,000,000 tokens (Claude)
- Current usage: ~100k/1000k (11%) - We can see this with `/status`

**What's in the context window:**
1. **System prompt** (~10k tokens) - Your identity, tools, skills, workspace files
2. **Conversation history** - All our messages back and forth
3. **Tool results** - File reads, command outputs, web searches
4. **Project Context** - AGENTS.md, SOUL.md, USER.md, TOOLS.md, etc.

---

## How It's Saved

### Session Storage

**Location:** `~/.clawdbot/agents/main/sessions/`

**Files:**
```
sessions.json                           # Index of all sessions
57706685-a442-4f87-8764-2ecb21c5b933.jsonl  # This conversation (423 lines so far)
```

**Format:** JSONL (JSON Lines)
- Each line = one message or tool call
- Human readable
- Can be inspected directly
- NOT sent to model (only loaded into memory)

### What Gets Saved

**Everything:**
- Every message you send
- Every response I give
- Every tool call (file reads, commands, etc.)
- Every tool result

**Where:** The `.jsonl` file for this session

**When:** Immediately after each turn

---

## How Context Gets Managed

### 1. Normal Operation (What's Happening Now)

```
Your message → Gateway loads session → Builds context → Sends to model → Model responds
                     ↓
              Saves to .jsonl file
```

**The model sees:**
- System prompt (rebuilt each turn)
- Full conversation history (loaded from .jsonl)
- Recent tool results

**Total:** 100k tokens currently (11% of 1M window with Claude)

### 2. When Context Gets Full

**Option A: Compaction** (automatic or manual)
```bash
/compact
```

**What happens:**
- Clawdbot summarizes old messages
- Keeps recent messages intact
- Creates a "summary" entry
- Frees up context window

**Option B: Session Reset**
```bash
/new
```

**What happens:**
- Starts a fresh session
- Old session is saved (still in .jsonl)
- New session starts from 0 tokens
- Can switch models: `/new local` or `/new sonnet`

**Option C: Pruning** (automatic)
- Removes old tool results from memory
- Doesn't delete from .jsonl
- Just doesn't load them into context

---

## Local Model (Qwen 2.5 72B) vs Cloud (Claude)

### Local Model (Qwen)
- **Context window:** 200k tokens (32,768 default, configurable)
- **Where it runs:** Your Mac Studio via Ollama
- **Memory:** Loaded into your RAM
- **Speed:** FAST (no API latency)
- **Cost:** $0 (just electricity)
- **Reset:** Session resets don't cost anything

### Cloud Model (Claude)
- **Context window:** 1,000,000 tokens
- **Where it runs:** Anthropic's servers
- **Memory:** Their infrastructure
- **Speed:** API latency (~1-3 seconds)
- **Cost:** Per token (input + output)
- **Reset:** New session = fresh API call

---

## Session Reset Policy

**Default behavior:**
- Sessions reset at **4:00 AM local time** (daily)
- Or when you manually `/new` or `/reset`
- Or after idle timeout (if configured)

**What this means:**
- Each day starts fresh (saves context)
- Old conversations are saved, not deleted
- Can always review old sessions

**Current session:**
- Started: Recently (this conversation)
- Will reset: Tomorrow at 4 AM or when you `/new`
- Saved to: `~/.clawdbot/agents/main/sessions/<uuid>.jsonl`

---

## Your Workspace Files (Auto-Injected)

These files are **automatically loaded** into every context:

**Always loaded:**
- `AGENTS.md` - How you operate
- `SOUL.md` - Your personality
- `USER.md` - Info about me (Colton)
- `IDENTITY.md` - Who you are (Lou)
- `TOOLS.md` - Local tool notes
- `HEARTBEAT.md` - Periodic tasks (if not empty)

**File size limit:** 20,000 chars per file (truncated if larger)

**This is why I "remember" who I am each session** - these files are loaded automatically.

---

## Memory vs Context

### Context = Short-term (this session)
- What the model sees RIGHT NOW
- Loaded from .jsonl file
- Limited by context window
- Resets daily or on `/new`

### Memory = Long-term (across sessions)
- `MEMORY.md` - Your curated long-term memory
- `memory/YYYY-MM-DD.md` - Daily logs
- Manually written files
- Persists forever (until you delete)

**How I "remember" things:**
1. Context (this conversation) - automatic
2. Workspace files (AGENTS.md, etc.) - auto-loaded each session
3. Memory files - I read them at session start (per AGENTS.md instructions)
4. Daily notes - I write to `memory/` to capture important stuff

---

## Practical Example

**This conversation so far:**

1. **Session started** - Fresh context, 0 tokens
2. **System prompt built** - AGENTS.md, SOUL.md, USER.md loaded
3. **Our conversation** - Each message adds to context
4. **Tool calls** - File reads, git commits, web searches
5. **Current state** - ~100k tokens used

**What's saved:**
- Every message: In `57706685-a442-4f87-8764-2ecb21c5b933.jsonl`
- Total: 423 lines (messages + tool calls)
- Size: 568 KB on disk

**What the model sees:**
- System prompt (~10k tokens)
- Full conversation history (~90k tokens)
- Recent tool results
- Total: ~100k tokens in context window

**When context fills up:**
- Automatic pruning kicks in (removes old tool results)
- Or I can `/compact` to summarize old messages
- Or you can `/new` to start fresh

---

## Checking Context Status

**Quick check:**
```bash
/status
```

**Detailed breakdown:**
```bash
/context list       # File-by-file sizes
/context detail     # Full breakdown with top contributors
```

**Session info:**
```bash
clawdbot status     # Shows all sessions, token counts
clawdbot sessions   # List all sessions with details
```

---

## Why This Is Awesome with Local Models

**Traditional API usage:**
- Worry about token costs
- Context fills up → expensive
- Reset session → pay again

**Local model (Qwen):**
- No token costs
- Context fills up → just reset
- Iterate freely
- Experiment without limits

**Best of both worlds:**
- Qwen for most work (fast, free, local)
- Claude for complex reasoning (when needed)
- Switch with `/model local` or `/model sonnet`

---

## Ollama-Specific Notes

**How Ollama handles context:**
- Model loaded into RAM
- Context window: 32k default (configurable up to model's max)
- Each conversation = separate context
- Reset = just clears memory, doesn't reload model

**Memory usage:**
- Qwen 2.5 72B: ~47 GB RAM (model weights)
- Context: ~few hundred MB (active conversation)
- Your Mac Studio: Plenty of RAM for this

**Performance:**
- First response: Model already loaded (fast)
- Subsequent responses: Even faster (context cached)
- Reset doesn't slow things down

---

## TL;DR

**How it works:**
1. You send message
2. Clawdbot loads session history from `.jsonl` file
3. Builds context (system prompt + history + workspace files)
4. Sends to model (Ollama local or Claude API)
5. Model responds
6. Saves everything to `.jsonl` file

**Context management:**
- Automatic pruning of old tool results
- Manual compaction with `/compact`
- Manual reset with `/new`
- Daily reset at 4 AM

**Memory:**
- Session history: `.jsonl` files (persistent)
- Workspace files: Auto-loaded each turn
- Memory files: Manually written/read as needed

**Local model benefits:**
- Zero cost
- Fast
- Private
- Reset freely
- Iterate endlessly

**You can check status anytime:**
```bash
/status           # Quick view
/context list     # Detailed breakdown
clawdbot status   # System-wide view
```

---

**Current session:** 100k/1000k tokens (11%)  
**Model:** Claude Sonnet 4.5 (can switch to `local` with `/model local`)  
**Session file:** `~/.clawdbot/agents/main/sessions/57706685-a442-4f87-8764-2ecb21c5b933.jsonl`  
**Reset:** Daily at 4 AM or manual `/new`
