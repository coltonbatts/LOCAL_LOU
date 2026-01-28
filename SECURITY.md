# Security Guidelines

## 🔒 NEVER COMMIT THESE TO GITHUB

### API Keys & Secrets
- Brave API keys
- Claude/Anthropic API keys
- Any API tokens or credentials
- OAuth tokens
- Private keys (`.pem`, `.key`, etc.)

### Config Files
- `~/.clawdbot/clawdbot.json` (contains API keys and auth tokens)
- Any backup configs (`clawdbot-backup-*.json`)
- `.env` files
- `secrets.json` or similar

### Personal Data
- Session logs with private conversations
- Email credentials
- SSH keys
- Password files

---

## ✅ Safe to Commit

- Documentation (`.md` files)
- Public configuration templates (with placeholder values)
- Scripts and code
- Skills and tools (non-sensitive)
- Workspace organization files

---

## How We Protect Secrets

### 1. `.gitignore`
We have a comprehensive `.gitignore` that blocks:
- All credential files
- Config files with API keys
- Environment files
- Temporary sensitive data

### 2. Store Secrets Locally Only
**DO:**
- Keep API keys in `~/.clawdbot/clawdbot.json` (local only)
- Use temp files on Desktop for key rotation
- Delete temp files after use

**DON'T:**
- Commit config backups to git
- Put keys in README or documentation
- Share keys in plain text anywhere public

### 3. Key Rotation Protocol
If a key gets exposed:
1. Create temp file on Desktop: `~/Desktop/new-key.txt`
2. Paste new key, save
3. Let Lou read it and update config
4. Lou deletes the temp file
5. Old key gets revoked/rotated

### 4. Git History Cleanup
If we accidentally commit secrets:
```bash
# Remove file from history
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/file' \
  --prune-empty --tag-name-filter cat -- --all

# Force push to rewrite history
git push origin --force --all

# Clean up local refs
rm -rf .git/refs/original/
```

**Then:** Immediately rotate any exposed keys!

---

## Incident Response

**If GitGuardian (or similar) alerts you:**

1. **Stop** - Don't panic, but act fast
2. **Remove** - Delete the file from git immediately
3. **Rewrite history** - Purge it from all commits
4. **Rotate** - Generate new keys and update config
5. **Verify** - Check that history is clean

---

## Best Practices

✅ **Use environment variables** for secrets when possible  
✅ **Keep backup configs LOCAL only** (not in git)  
✅ **Check `.gitignore` before committing** new file types  
✅ **Use `git status`** to review what's being committed  
✅ **Rotate keys periodically** even without incidents  

❌ **Never commit** `~/.clawdbot/clawdbot.json`  
❌ **Never share** gateway auth tokens publicly  
❌ **Never hardcode** API keys in scripts (use config files)  

---

## Quick Reference

**Generate new random token:**
```bash
openssl rand -hex 24
```

**Check what's about to be committed:**
```bash
git status
git diff --cached
```

**List files ignored by git:**
```bash
git status --ignored
```

---

**Last updated:** 2026-01-28  
**Incident count:** 1 (resolved - Brave API + gateway token exposed, rotated immediately)
