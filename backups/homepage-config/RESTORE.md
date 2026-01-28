# Homepage Command Center - Restore Guide

## What This Is

Your custom Homepage dashboard running on `http://localhost:3002`

**Features:**
- Pure black theme
- Core systems (Clawdbot, Ollama)
- Skills development links
- Alternative Design social links
- Business intel & docs
- System resource monitors

## Docker Container

**Container name:** `homepage`  
**Port:** 3002 → 3000  
**Config location:** `~/homepage/config/`

## Restore Config

If you need to restore your config:

```bash
# Backup current (if any)
cp -r ~/homepage/config ~/homepage/config.backup

# Restore from this backup
cp -r ~/clawd/backups/homepage-config/* ~/homepage/config/

# Restart container
docker restart homepage
```

## Restart Homepage

```bash
docker restart homepage
```

## View Logs

```bash
docker logs homepage --tail 50
```

## Rebuild Container (if needed)

If the container is missing or broken:

```bash
# Stop and remove old container
docker stop homepage
docker rm homepage

# Run new container
docker run -d \
  --name homepage \
  -p 3002:3000 \
  -v ~/homepage/config:/app/config \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --restart unless-stopped \
  ghcr.io/gethomepage/homepage:latest
```

## Files Backed Up

- `services.yaml` - All your service links
- `bookmarks.yaml` - Bookmarks organized by category
- `widgets.yaml` - System resource monitors
- `settings.yaml` - Theme & layout settings
- `custom.css` - Pure black theme styling

## Customization

### Add New Service

Edit `~/homepage/config/services.yaml`:

```yaml
- Your Category:
    - Service Name:
        href: https://example.com
        description: What it does
        icon: /icons/example.svg
        weight: 1
```

### Add Bookmark

Edit `~/homepage/config/bookmarks.yaml`:

```yaml
- Category Name:
    - Bookmark Name:
        - icon: si-github
          href: https://example.com
```

### Change Theme

Edit `~/homepage/config/custom.css` - change color variables at the top.

### Update Settings

Edit `~/homepage/config/settings.yaml`:
- Title
- Theme
- Layout

Then restart: `docker restart homepage`

## Access

**Local:** http://localhost:3002  
**Over Tailscale:** https://coltons-mac-studio.tailc76d2c.ts.net:3002 (if configured)

## Set as Chrome Homepage

1. Chrome Settings → On startup
2. "Open a specific page or set of pages"
3. Add: `http://localhost:3002`

Or:
1. Settings → Appearance
2. "Show home button" ON
3. "Enter custom web address": `http://localhost:3002`

---

**Last updated:** 2026-01-28  
**Theme:** Pure black with indigo accents  
**Config backup:** `~/clawd/backups/homepage-config/`
