# Troubleshooting Guide

Common issues and solutions for the Remotion Thumbnail skill.

## Installation Issues

### "Node version too old"

**Error:**
```
Error: Node.js 18 or higher is required
```

**Solution:**
```bash
# Check current version
node --version

# Install latest Node.js from nodejs.org
# Or use nvm:
nvm install 18
nvm use 18
```

### "npm install fails in renderer/"

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and try again
rm -rf node_modules package-lock.json
npm install

# If still failing, try legacy peer deps
npm install --legacy-peer-deps
```

---

## Replicate API Issues

### "REPLICATE_API_TOKEN not set"

**Error:**
```
❌ Error: REPLICATE_API_TOKEN environment variable is not set.
```

**Solution:**
```bash
# Set the token
export REPLICATE_API_TOKEN="your-token-here"

# Verify it's set
echo $REPLICATE_API_TOKEN

# For permanent fix, add to ~/.zshrc or ~/.bashrc:
echo 'export REPLICATE_API_TOKEN="your-token-here"' >> ~/.zshrc
source ~/.zshrc
```

### "Replicate API authentication failed"

**Error:**
```
401: Authentication failed
```

**Solutions:**
1. Verify token is correct (copy fresh from replicate.com)
2. Check for extra spaces/quotes in token
3. Ensure account is active and has credits

### "Replicate rate limit exceeded"

**Error:**
```
429: Rate limit exceeded
```

**Solution:**
- Free tier: 50 requests/day
- Wait or upgrade to paid plan
- Process cutouts in batches if needed

### "Background removal failed"

**Error:**
```
❌ Failed to process [X]: Model error
```

**Possible causes:**
1. **Image too large** - Resize to <10MB
2. **Corrupted file** - Re-capture that expression
3. **Unsupported format** - Use JPG or PNG only

**Solution:**
```bash
# Check file size
ls -lh storage/raw/*.jpg

# If too large, resize:
sips -Z 1920 storage/raw/large_image.jpg
```

---

## Capture Script Issues

### "File not found" during capture

**Error:**
```
⚠️ File not found at /path/to/file. Please try again.
```

**Solution:**
1. Verify you saved photo to exact path shown
2. Check file extension matches (`.jpg` not `.jpeg`)
3. Ensure no extra spaces in filename

### "expressions_db.json corrupted"

**Symptoms:** Script crashes or shows weird data

**Solution:**
```bash
# Backup current (in case recoverable)
cp storage/expressions_db.json storage/expressions_db.json.backup

# Start fresh
rm storage/expressions_db.json

# Re-run capture for missing expressions
node scripts/capture.js
```

### "Already captured but want to retake"

**Solution:**
```bash
# Option 1: Delete specific expression from DB
# Edit storage/expressions_db.json and remove that expression entry

# Option 2: Delete all and start over
rm storage/expressions_db.json
rm storage/raw/*
node scripts/capture.js
```

---

## Rendering Issues

### "Remotion command not found"

**Error:**
```
npx: command not found: remotion
```

**Solution:**
```bash
# Make sure you're in the renderer directory
cd renderer

# Verify node_modules exists
ls node_modules/@remotion

# If not, install:
npm install
```

### "Cannot find cutout file"

**Error:**
```
Error: Cannot read file: storage/cutouts/5_cutout.png
```

**Solution:**
1. Verify cutout exists:
   ```bash
   ls storage/cutouts/
   ```

2. If missing, run cutout generation:
   ```bash
   node scripts/process_cutouts.js
   ```

3. Use absolute path instead of relative:
   ```bash
   --props='{"cutoutUrl": "/full/path/to/cutout.png"}'
   ```

### "Invalid JSON in props"

**Error:**
```
Error: Unexpected token in JSON
```

**Common causes:**
- Missing quotes around strings
- Extra commas
- Unescaped special characters

**Solution:**
```bash
# Bad:
--props='{"headline": This is wrong}'

# Good:
--props='{"headline": "This is right"}'

# If headline has quotes, escape them:
--props='{"headline": "The \"Best\" Video"}'
```

### "Rendering takes forever"

**Causes:**
- Large background image
- Complex Remotion composition
- Low-powered machine

**Solutions:**
```bash
# Use smaller background images (<2MB)
# Resize before using:
sips -Z 1920 background.jpg

# Close other apps to free RAM

# Render at lower quality for testing:
--quality 50
```

---

## Cutout Quality Issues

### "Cutout has rough edges"

**Causes:**
- Low contrast with background
- Shadows on wall
- Hair blending with background

**Solutions:**
1. **Better lighting:** Move away from wall (2-3 feet)
2. **Higher contrast:** Wear colors that contrast with background
3. **Manual touch-up:** Use Photoshop/GIMP to refine edges

### "Cutout removed part of me"

**Causes:**
- Clothing color too close to background
- Hands too close to background

**Solutions:**
1. Re-capture with better separation
2. Wear contrasting colors
3. Distance yourself from background
4. Manual editing as last resort

### "Shadow included in cutout"

**Cause:** Shadow on wall behind you

**Solution:**
1. Move further from wall
2. Adjust lighting angle
3. Use diffused light (softbox, window)

---

## Performance Optimization

### Slow Cutout Generation

**Expected:** ~30-60 seconds per cutout (API processing)

**If slower:**
- Check internet speed
- Try during off-peak hours
- Process in smaller batches

### Slow Rendering

**Tips:**
- Use SSD for faster file access
- Close heavy apps (browsers, etc.)
- Render at 1080p instead of 4K for testing
- Use cached backgrounds (local files vs URLs)

---

## Common Questions

### "Can I use different expressions than the 25 presets?"

**Yes!** The presets are suggestions. You can:
1. Add custom expressions to `assets/expressions.json`
2. Capture them using the script
3. Use any emotion ID you want

### "Can I have multiple people?"

**Current version:** Single person only

**Workaround:** 
- Capture expressions for each person separately
- Manually composite in Photoshop/GIMP
- Or modify the Remotion renderer to support multiple cutouts

### "How do I change the font/colors?"

**Edit the renderer:**
```bash
# Open in your editor
code renderer/src/Thumbnail.tsx

# Modify styles, fonts, colors
# Then render as normal
```

### "Can I export video instead of still image?"

**Yes!** Remotion supports video:
```bash
npx remotion render Thumbnail renderer/out/video.mp4 \
  --props='{ your props }'
```

Useful for animated thumbnails or social media clips.

---

## Getting More Help

### Still stuck?

1. **Check the logs:**
   - Renderer logs: `renderer/logs/`
   - Script errors: Terminal output

2. **Search existing issues:**
   https://github.com/alternative-design/remotion-thumbnail/issues

3. **Ask for help:**
   - Create new issue with:
     - Error message (full text)
     - Steps to reproduce
     - Your environment (OS, Node version)
     - Screenshots if visual issue

4. **Join discussions:**
   https://github.com/alternative-design/remotion-thumbnail/discussions

### Debug Mode

```bash
# Run scripts with more logging
DEBUG=* node scripts/capture.js
DEBUG=* node scripts/process_cutouts.js

# Remotion verbose mode
npx remotion still Thumbnail out.png --props='...' --log=verbose
```

---

## Known Limitations

- **Single cutout per thumbnail** (current version)
- **Requires internet** for Replicate API during cutout generation
- **Node.js 18+** required (older versions unsupported)
- **macOS/Linux recommended** (Windows works but less tested)

---

**Found a bug?** Please report it: https://github.com/alternative-design/remotion-thumbnail/issues/new

**Have a fix?** Pull requests welcome: https://github.com/alternative-design/remotion-thumbnail/pulls
