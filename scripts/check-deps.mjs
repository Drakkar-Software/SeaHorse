#!/usr/bin/env node
/**
 * Compare example/package.json deps against packages/seahorse peerDependencies.
 * Run from repo root: node scripts/check-deps.mjs
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import semver from 'semver'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const examplePkg = JSON.parse(readFileSync(resolve(root, 'example/package.json'), 'utf8'))
const seahorsePkg = JSON.parse(readFileSync(resolve(root, 'packages/seahorse/package.json'), 'utf8'))

const exampleDeps = { ...examplePkg.dependencies, ...examplePkg.devDependencies }
const peers = seahorsePkg.peerDependencies ?? {}
const optionalPeers = Object.keys(seahorsePkg.peerDependenciesMeta ?? {})

const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const RED = '\x1b[31m'
const DIM = '\x1b[2m'
const RESET = '\x1b[0m'

const peerOnlyExclusions = new Set(['@drakkar.software/seahorse'])

let missing = 0, present = 0, extraInExample = 0, peerMismatches = 0

console.log(`\nSeahorse ${seahorsePkg.version} vs example ${examplePkg.version}\n`)
console.log('── Peer deps check ──────────────────────────────────────────')

for (const [pkg, range] of Object.entries(peers)) {
  const isOptional = optionalPeers.includes(pkg)
  const exampleVersion = exampleDeps[pkg]
  const tag = isOptional ? `${DIM}[optional]${RESET}` : '[required]'

  if (exampleVersion) {
    const compatible = range === exampleVersion
    const icon = compatible ? `${GREEN}✓${RESET}` : `${RED}✗${RESET}`
    console.log(`${icon} ${pkg.padEnd(45)} peer: ${range.padEnd(20)} example: ${exampleVersion} ${tag}`)
    present++
    if (!compatible) peerMismatches++
  } else {
    const color = isOptional ? YELLOW : RED
    console.log(`${color}✗${RESET} ${pkg.padEnd(45)} peer: ${range.padEnd(20)} ${DIM}not in example${RESET} ${tag}`)
    missing++
  }
}

console.log('\n── Example deps not in seahorse peers ───────────────────────')
for (const [pkg, ver] of Object.entries(examplePkg.dependencies ?? {})) {
  if (!peers[pkg] && !peerOnlyExclusions.has(pkg)) {
    console.log(`  ${DIM}${pkg.padEnd(45)} ${ver}${RESET}`)
    extraInExample++
  }
}

const seahorseDevDeps = seahorsePkg.devDependencies ?? {}
const shared = Object.keys(exampleDeps).filter(pkg => seahorseDevDeps[pkg])

let versionMismatches = 0

console.log('\n── Version comparison (example vs seahorse devDeps) ─────────')
for (const pkg of shared) {
  const exVer = exampleDeps[pkg]
  const shVer = seahorseDevDeps[pkg]
  const match = exVer === shVer
  const icon = match ? `${GREEN}✓${RESET}` : `${RED}✗${RESET}`
  console.log(`${icon} ${pkg.padEnd(45)} example: ${exVer.padEnd(20)} seahorse: ${shVer}`)
  if (!match) versionMismatches++
}

console.log('\n── Summary ──────────────────────────────────────────────────')
console.log(`  ${GREEN}Present${RESET}: ${present}`)
console.log(`  ${YELLOW}Missing${RESET}: ${missing} (check optionals — may be intentional)`)
console.log(`  Extra in example (not seahorse peers): ${extraInExample}`)
console.log(`  Peer version mismatches (example vs seahorse peers): ${peerMismatches ? RED : GREEN}${peerMismatches}${RESET}`)
console.log(`  Version mismatches (example vs seahorse devDeps): ${versionMismatches ? RED : GREEN}${versionMismatches}${RESET}`)
console.log()
