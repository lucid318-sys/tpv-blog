import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'logo.png');

async function main() {
  // favicon-32.png
  await sharp(logoPath)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32.png'));
  console.log('Created favicon-32.png');

  // favicon.ico (32px PNG — browsers accept PNG in .ico)
  await sharp(logoPath)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created favicon.ico');

  // apple-touch-icon.png (180px)
  await sharp(logoPath)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // icon-512.png
  await sharp(logoPath)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('Created icon-512.png');

  // icon-192.png (for webmanifest)
  await sharp(logoPath)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('Created icon-192.png');

  // OG image: 1200x630 — resize logo to fit and extend with background color
  const canvasW = 1200;
  const canvasH = 630;
  const bg = { r: 103, g: 16, b: 22 };

  await sharp(logoPath)
    .resize(canvasW, canvasH, { fit: 'contain', background: bg })
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Created og-image.png');
}

main().catch(console.error);
