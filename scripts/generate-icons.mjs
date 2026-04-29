import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const svgPath = resolve(root, 'public/icons/icon.svg');
const svg = readFileSync(svgPath);

await sharp(svg).resize(192, 192).png().toFile(resolve(root, 'public/icons/icon-192.png'));
await sharp(svg).resize(512, 512).png().toFile(resolve(root, 'public/icons/icon-512.png'));

console.log('Icons generated: 192/512');
