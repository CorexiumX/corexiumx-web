import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
const root = new URL('../', import.meta.url)
const manifest = JSON.parse(readFileSync(new URL('src/design/manifest.json', root), 'utf8'))
assert.equal(manifest.schemaVersion, 1, 'Unsupported manifest schema')
const tokens = JSON.parse(readFileSync(new URL('src/design/tokens.json', root), 'utf8'))
assert.equal(tokens.schemaVersion, 1, 'Unsupported token schema')
assert.equal(tokens.version, manifest.version, 'Token version mismatch')
for (const [path, asset] of Object.entries(manifest.files)) {
  assert.match(path, /^(src\/design\/|public\/)/)
  assert.equal(createHash('sha256').update(readFileSync(new URL(path, root))).digest('hex'), asset.sha256, `Design asset modified: ${path}`)
}
console.log(`Verified ${Object.keys(manifest.files).length} design assets at ${manifest.revision}`)
