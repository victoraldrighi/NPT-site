// scripts/generate-og-image.js
// Creates a 1200x630 PNG with navy background using only Node.js built-ins.
// No npm packages required. Run: node scripts/generate-og-image.js

import { writeFileSync, mkdirSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const W = 1200
const H = 630
const NAVY = [0x1B, 0x3A, 0x6B] // #1B3A6B

// Build raw image data: H rows, each row = filter byte (0) + W*3 bytes RGB
const rowSize = 1 + W * 3
const raw = new Uint8Array(H * rowSize)
for (let y = 0; y < H; y++) {
  raw[y * rowSize] = 0 // filter type None
  for (let x = 0; x < W; x++) {
    const i = y * rowSize + 1 + x * 3
    raw[i]     = NAVY[0]
    raw[i + 1] = NAVY[1]
    raw[i + 2] = NAVY[2]
  }
}

// CRC32 implementation (no external dependency)
function buildCrcTable() {
  const t = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
    }
    t[i] = c
  }
  return t
}

const CRC_TABLE = buildCrcTable()

function crc32(buf) {
  let c = 0xFFFFFFFF
  for (const b of buf) {
    c = CRC_TABLE[(c ^ b) & 0xFF] ^ (c >>> 8)
  }
  return (c ^ 0xFFFFFFFF) >>> 0
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii')
  const lenBuf = Buffer.allocUnsafe(4)
  lenBuf.writeUInt32BE(data.length)
  const crcInput = Buffer.concat([typeBytes, data])
  const crcBuf = Buffer.allocUnsafe(4)
  crcBuf.writeUInt32BE(crc32(crcInput))
  return Buffer.concat([lenBuf, typeBytes, data, crcBuf])
}

// PNG signature
const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

// IHDR chunk: width, height, bit depth 8, color type 2 (RGB)
const ihdrData = Buffer.allocUnsafe(13)
ihdrData.writeUInt32BE(W, 0)
ihdrData.writeUInt32BE(H, 4)
ihdrData[8]  = 8 // bit depth
ihdrData[9]  = 2 // color type: RGB
ihdrData[10] = 0 // compression method
ihdrData[11] = 0 // filter method
ihdrData[12] = 0 // interlace method

// Compress raw image data
const compressed = deflateSync(Buffer.from(raw))

// Assemble PNG
const png = Buffer.concat([
  sig,
  chunk('IHDR', ihdrData),
  chunk('IDAT', compressed),
  chunk('IEND', Buffer.alloc(0))
])

mkdirSync('public', { recursive: true })
writeFileSync('public/og-image.png', png)
console.log(`Generated public/og-image.png (${W}x${H}, navy #1B3A6B) — ${png.length} bytes`)
