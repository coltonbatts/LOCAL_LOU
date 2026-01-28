# Batch Generation Guide

Automate thumbnail generation for multiple videos at once.

## Why Batch Generation?

- **Save time:** Generate 10+ thumbnails in one command
- **A/B testing:** Create variations to test which performs better  
- **Consistency:** Maintain branding across your channel
- **Automation:** Integrate with your video production workflow

---

## Quick Examples

### Generate Multiple Variations

```bash
#!/bin/bash
# generate_variations.sh

HEADLINES=(
  "This Changed EVERYTHING!"
  "You Won't Believe This"
  "The TRUTH About..."
)

for i in "${!HEADLINES[@]}"; do
  npx remotion still Thumbnail "out/variation_$i.png" \
    --props="{
      \"headline\": \"${HEADLINES[$i]}\",
      \"emotionId\": 5,
      \"stylePreset\": \"bold\",
      \"cutoutUrl\": \"storage/cutouts/5_cutout.png\",
      \"bgUrl\": \"https://source.unsplash.com/1920x1080/?tech\"
    }"
done
```

### Batch Process Multiple Videos

```bash
#!/bin/bash
# batch_thumbnails.sh

# Array of video data: headline, emotion, style, bg
videos=(
  "Amazing Discovery|5|bold|https://example.com/bg1.jpg"
  "Shocking Truth|6|dramatic|https://example.com/bg2.jpg"
  "How To Win|23|clean|https://example.com/bg3.jpg"
)

for video in "${videos[@]}"; do
  IFS='|' read -r headline emotion style bg <<< "$video"
  
  # Sanitize filename
  filename=$(echo "$headline" | tr '[:upper:]' '[:lower:]' | tr ' ' '_')
  
  npx remotion still Thumbnail "out/${filename}.png" \
    --props="{
      \"headline\": \"$headline\",
      \"emotionId\": $emotion,
      \"stylePreset\": \"$style\",
      \"cutoutUrl\": \"storage/cutouts/${emotion}_cutout.png\",
      \"bgUrl\": \"$bg\"
    }"
done
```

---

## CSV-Driven Generation

Perfect for bulk production or client work.

### Create CSV File

**thumbnails.csv:**
```csv
headline,emotion,style,background
This Changed Everything,5,bold,https://source.unsplash.com/1920x1080/?technology
The Shocking Truth,6,dramatic,https://source.unsplash.com/1920x1080/?dark
How I Won,23,clean,https://source.unsplash.com/1920x1080/?success
```

### Node.js Batch Script

**batch_from_csv.js:**
```javascript
const fs = require('fs');
const { execSync } = require('child_process');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('thumbnails.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    results.forEach((row, index) => {
      const props = JSON.stringify({
        headline: row.headline,
        emotionId: parseInt(row.emotion),
        stylePreset: row.style,
        cutoutUrl: `storage/cutouts/${row.emotion}_cutout.png`,
        bgUrl: row.background
      });

      const filename = `thumbnail_${index + 1}.png`;
      
      console.log(`Generating: ${row.headline}`);
      
      execSync(
        `npx remotion still Thumbnail out/${filename} --props='${props}'`,
        { stdio: 'inherit' }
      );
    });
    
    console.log(`✅ Generated ${results.length} thumbnails!`);
  });
```

**Run it:**
```bash
npm install csv-parser
node batch_from_csv.js
```

---

## A/B Testing Templates

Generate variations to test what works best.

### Test Different Headlines

```bash
#!/bin/bash
# test_headlines.sh

EMOTION=5
STYLE="bold"
BG="https://source.unsplash.com/1920x1080/?tech"

HEADLINES=(
  "This Will Blow Your Mind"
  "You Need To See This"
  "The Secret They Don't Want You To Know"
  "I Can't Believe This Worked"
)

for i in "${!HEADLINES[@]}"; do
  npx remotion still Thumbnail "out/headline_test_$i.png" \
    --props="{
      \"headline\": \"${HEADLINES[$i]}\",
      \"emotionId\": $EMOTION,
      \"stylePreset\": \"$STYLE\",
      \"cutoutUrl\": \"storage/cutouts/${EMOTION}_cutout.png\",
      \"bgUrl\": \"$BG\"
    }"
done

echo "✅ Generated ${#HEADLINES[@]} headline variations"
```

### Test Different Emotions

```bash
#!/bin/bash
# test_emotions.sh

HEADLINE="This Changed Everything"
STYLE="bold"
BG="https://source.unsplash.com/1920x1080/?tech"

EMOTIONS=(2 5 6 19 21)  # Happy, Surprised, Shocked, Excited, Mind Blown

for emotion in "${EMOTIONS[@]}"; do
  npx remotion still Thumbnail "out/emotion_test_${emotion}.png" \
    --props="{
      \"headline\": \"$HEADLINE\",
      \"emotionId\": $emotion,
      \"stylePreset\": \"$STYLE\",
      \"cutoutUrl\": \"storage/cutouts/${emotion}_cutout.png\",
      \"bgUrl\": \"$BG\"
    }"
done

echo "✅ Generated ${#EMOTIONS[@]} emotion variations"
```

### Test Style Presets

```bash
#!/bin/bash
# test_styles.sh

HEADLINE="Amazing Discovery"
EMOTION=5
BG="https://source.unsplash.com/1920x1080/?abstract"

STYLES=("bold" "dramatic" "clean")

for style in "${STYLES[@]}"; do
  npx remotion still Thumbnail "out/style_test_${style}.png" \
    --props="{
      \"headline\": \"$HEADLINE\",
      \"emotionId\": $EMOTION,
      \"stylePreset\": \"$style\",
      \"cutoutUrl\": \"storage/cutouts/${EMOTION}_cutout.png\",
      \"bgUrl\": \"$BG\"
    }"
done

echo "✅ Generated ${#STYLES[@]} style variations"
```

---

## Integration Examples

### YouTube Upload Workflow

```bash
#!/bin/bash
# youtube_upload_with_thumbnail.sh

VIDEO_FILE="my_video.mp4"
TITLE="My Amazing Video"
DESCRIPTION="Check this out!"

# 1. Generate thumbnail
npx remotion still Thumbnail "thumbnail.png" \
  --props="{
    \"headline\": \"$TITLE\",
    \"emotionId\": 5,
    \"stylePreset\": \"bold\",
    \"cutoutUrl\": \"storage/cutouts/5_cutout.png\",
    \"bgUrl\": \"https://source.unsplash.com/1920x1080/?youtube\"
  }"

# 2. Upload video with thumbnail
# (Using youtube-upload or similar tool)
youtube-upload \
  --title="$TITLE" \
  --description="$DESCRIPTION" \
  --thumbnail="thumbnail.png" \
  "$VIDEO_FILE"

echo "✅ Video uploaded with custom thumbnail!"
```

### Notion Database Integration

```javascript
// generate_from_notion.js
const { Client } = require('@notionhq/client');
const { execSync } = require('child_process');

const notion = new Client({ auth: process.env.NOTION_KEY });

async function generateThumbnails() {
  // Query your Notion database
  const response = await notion.databases.query({
    database_id: 'your-database-id',
    filter: {
      property: 'Status',
      select: { equals: 'Ready for Thumbnail' }
    }
  });

  for (const page of response.results) {
    const title = page.properties.Title.title[0].plain_text;
    const emotion = page.properties.Emotion.number;
    const style = page.properties.Style.select.name;

    const props = JSON.stringify({
      headline: title,
      emotionId: emotion,
      stylePreset: style.toLowerCase(),
      cutoutUrl: `storage/cutouts/${emotion}_cutout.png`,
      bgUrl: 'https://source.unsplash.com/1920x1080/?youtube'
    });

    execSync(
      `npx remotion still Thumbnail out/${page.id}.png --props='${props}'`,
      { stdio: 'inherit' }
    );

    // Update Notion with generated thumbnail
    await notion.pages.update({
      page_id: page.id,
      properties: {
        Status: { select: { name: 'Thumbnail Generated' } }
      }
    });
  }
}

generateThumbnails();
```

---

## Advanced Patterns

### Parallel Processing (Faster)

```bash
#!/bin/bash
# parallel_generation.sh

HEADLINES=(
  "Title 1"
  "Title 2"
  "Title 3"
  "Title 4"
)

# Generate all in parallel
for i in "${!HEADLINES[@]}"; do
  npx remotion still Thumbnail "out/thumb_$i.png" \
    --props="{
      \"headline\": \"${HEADLINES[$i]}\",
      \"emotionId\": 5,
      \"stylePreset\": \"bold\",
      \"cutoutUrl\": \"storage/cutouts/5_cutout.png\",
      \"bgUrl\": \"https://source.unsplash.com/1920x1080/?$i\"
    }" &
done

# Wait for all background jobs to complete
wait

echo "✅ All thumbnails generated!"
```

### Dynamic Background Selection

```javascript
// smart_background.js
const { execSync } = require('child_process');

function getBackgroundForTopic(topic) {
  const bgMap = {
    tech: 'https://source.unsplash.com/1920x1080/?technology',
    business: 'https://source.unsplash.com/1920x1080/?business',
    gaming: 'https://source.unsplash.com/1920x1080/?gaming',
    fitness: 'https://source.unsplash.com/1920x1080/?fitness'
  };
  
  return bgMap[topic] || 'https://source.unsplash.com/1920x1080/';
}

const videos = [
  { title: 'New iPhone Review', topic: 'tech', emotion: 5 },
  { title: 'Startup Tips', topic: 'business', emotion: 23 },
  { title: 'GTA 6 Reveal', topic: 'gaming', emotion: 21 }
];

videos.forEach((video, i) => {
  const props = JSON.stringify({
    headline: video.title,
    emotionId: video.emotion,
    stylePreset: 'bold',
    cutoutUrl: `storage/cutouts/${video.emotion}_cutout.png`,
    bgUrl: getBackgroundForTopic(video.topic)
  });

  execSync(
    `npx remotion still Thumbnail out/video_${i}.png --props='${props}'`,
    { stdio: 'inherit' }
  );
});
```

---

## Quality Control

### Preview Before Final Render

```bash
#!/bin/bash
# preview_mode.sh

# Render at lower quality for quick preview
npx remotion still Thumbnail preview.png \
  --quality 50 \
  --props='{ your props }'

# Open preview
open preview.png

# If approved, render final
read -p "Generate final? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  npx remotion still Thumbnail final.png \
    --quality 100 \
    --props='{ your props }'
fi
```

### Validation Script

```javascript
// validate_before_render.js
const fs = require('fs');

function validateProps(props) {
  const errors = [];
  
  // Check headline length
  if (props.headline.length > 50) {
    errors.push('Headline too long (max 50 chars)');
  }
  
  // Check emotion exists
  const cutoutPath = props.cutoutUrl;
  if (!fs.existsSync(cutoutPath)) {
    errors.push(`Cutout not found: ${cutoutPath}`);
  }
  
  // Check style preset
  const validStyles = ['bold', 'dramatic', 'clean'];
  if (!validStyles.includes(props.stylePreset)) {
    errors.push(`Invalid style: ${props.stylePreset}`);
  }
  
  return errors;
}

// Example usage
const props = {
  headline: "This is my title",
  emotionId: 5,
  stylePreset: "bold",
  cutoutUrl: "storage/cutouts/5_cutout.png",
  bgUrl: "https://example.com/bg.jpg"
};

const errors = validateProps(props);
if (errors.length > 0) {
  console.error('❌ Validation failed:');
  errors.forEach(err => console.error('  -', err));
  process.exit(1);
}

console.log('✅ Props valid, ready to render!');
```

---

## Performance Tips

- **Use local backgrounds** when possible (faster than URLs)
- **Parallel rendering** speeds up batch jobs
- **Cache cutouts** (they never change)
- **Preview mode** for iteration (lower quality = faster)
- **SSD storage** for renderer files

---

## Example: Full Production Pipeline

```bash
#!/bin/bash
# production_pipeline.sh

echo "🎬 Starting Thumbnail Production Pipeline"

# 1. Validate all inputs
echo "📋 Validating inputs..."
node validate_before_render.js

# 2. Generate previews
echo "👀 Generating previews..."
./preview_mode.sh

# 3. Batch generate finals
echo "🎨 Generating finals..."
./batch_from_csv.sh

# 4. Optimize file sizes
echo "📦 Optimizing..."
for file in out/*.png; do
  pngquant --quality=85-95 "$file" --output "${file%.png}_optimized.png"
done

# 5. Upload to cloud storage
echo "☁️ Uploading..."
aws s3 sync out/ s3://my-bucket/thumbnails/

echo "✅ Pipeline complete!"
```

---

**Next steps:** Integrate into your video production workflow and never manually create thumbnails again! 🚀
