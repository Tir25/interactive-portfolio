const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Ensure output directories exist
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Convert SVG to JPG for social preview
async function generateSocialPreview() {
  try {
    const svgBuffer = fs.readFileSync(path.join(publicDir, 'social-preview.svg'));
    
    // Convert to JPG with high quality
    await sharp(svgBuffer)
      .jpeg({ 
        quality: 90,
        progressive: true
      })
      .toFile(path.join(publicDir, 'social-preview.jpg'));
    
    console.log('✅ Social preview image generated successfully');
  } catch (err) {
    console.error('❌ Error generating social preview:', err);
  }
}

// Generate app icons from the SVG
async function generateAppIcons() {
  try {
    // Create a simple placeholder icon (blue square with TR initials)
    const iconSvg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#1e293b"/>
      <rect x="10" y="10" width="492" height="492" rx="80" fill="#0f172a"/>
      <linearGradient id="grad" x1="0" y1="0" x2="512" y2="512">
        <stop offset="0%" stop-color="#3b82f6"/>
        <stop offset="100%" stop-color="#6366f1"/>
      </linearGradient>
      <rect x="40" y="40" width="432" height="432" rx="60" fill="url(#grad)"/>
      <text x="256" y="290" font-family="'Inter', sans-serif" font-size="180" font-weight="700" text-anchor="middle" fill="white">TR</text>
    </svg>`;
    
    // Save the SVG icon
    fs.writeFileSync(path.join(publicDir, 'favicon.svg'), iconSvg);
    
    // Generate 192x192 PNG icon
    await sharp(Buffer.from(iconSvg))
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'icon-192x192.png'));
    
    // Generate 512x512 PNG icon
    await sharp(Buffer.from(iconSvg))
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'icon-512x512.png'));
    
    // Generate apple-touch-icon
    await sharp(Buffer.from(iconSvg))
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    // Generate favicon.ico (16x16)
    await sharp(Buffer.from(iconSvg))
      .resize(16, 16)
      .toFormat('ico')
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('✅ App icons generated successfully');
  } catch (err) {
    console.error('❌ Error generating app icons:', err);
  }
}

// Run all generation tasks
async function generateAllImages() {
  await generateSocialPreview();
  await generateAppIcons();
  console.log('✅ All images generated successfully');
}

generateAllImages(); 