import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const out = 'shots';
mkdirSync(out, { recursive: true });

const pages = [
  ['home', 'http://localhost:4200/'],
  ['catalogo', 'http://localhost:4200/catalogo'],
  ['producto', 'http://localhost:4200/producto/aurora-9-negro-mate'],
  ['carrito', 'http://localhost:4200/carrito'],
  ['resenas', 'http://localhost:4200/resenas'],
  ['galeria', 'http://localhost:4200/galeria'],
  ['contacto', 'http://localhost:4200/contacto']
];

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars']
});
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 });

for (const [name, url] of pages) {
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${out}/${name}.png` });
  console.log('captured', name);
}

await browser.close();
console.log('done');
