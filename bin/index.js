#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { createInterface } from 'readline/promises'
import { join } from 'path'
import { stdin as input, stdout as output } from 'process'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const templatesDir = join(__dirname, '..', 'templates')

function printHelp() {
  console.log(`
Usage:
  npx create-vafast-app [project-name]

Options:
  -h, --help    Show help

Examples:
  npx create-vafast-app
  npx create-vafast-app my-vafast-app
`)
}

function resolveTargetDir(argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    printHelp()
    process.exit(0)
  }

  const positional = argv.filter(arg => !arg.startsWith('-'))
  if (positional.length > 0) {
    return positional[0]
  }

  return null
}

function assertValidTargetDir(targetDir) {
  if (!targetDir?.trim()) {
    console.error('❌ Project folder cannot be empty')
    process.exit(1)
  }

  if (
    targetDir.includes('..')
    || targetDir.includes('/')
    || targetDir.includes('\\')
  ) {
    console.error('❌ Project folder must be a simple directory name')
    process.exit(1)
  }
}

function copyRecursive(srcDir, destDir) {
  mkdirSync(destDir, { recursive: true })
  for (const file of readdirSync(srcDir)) {
    const srcFile = join(srcDir, file)
    const destFile = join(destDir, file)
    if (statSync(srcFile).isDirectory()) {
      copyRecursive(srcFile, destFile)
    }
    else {
      copyFileSync(srcFile, destFile)
    }
  }
}

async function promptProjectName(initial = 'my-vafast-app') {
  const rl = createInterface({ input, output })

  try {
    const answer = await rl.question(`Project folder: (${initial}) `)
    return answer.trim() || initial
  }
  catch (error) {
    if (
      error
      && typeof error === 'object'
      && 'code' in error
      && error.code === 'ABORT_ERR'
    ) {
      console.log('Cancelled.')
      process.exit(0)
    }

    throw error
  }
  finally {
    rl.close()
  }
}

async function main() {
  let targetDir = resolveTargetDir(process.argv.slice(2))

  if (!targetDir) {
    if (!process.stdin.isTTY) {
      targetDir = 'my-vafast-app'
      console.log(`Using default project folder: ${targetDir}`)
    }
    else {
      targetDir = await promptProjectName()
    }
  }

  assertValidTargetDir(targetDir)

  const source = join(templatesDir, 'node-vafast')
  const dest = join(process.cwd(), targetDir)

  if (!existsSync(source)) {
    console.error('❌ Template not found')
    process.exit(1)
  }

  if (existsSync(dest)) {
    console.error(`❌ Directory '${targetDir}' already exists`)
    process.exit(1)
  }

  copyRecursive(source, dest)

  console.log(`\n✅ Vafast app created in '${targetDir}'\n`)
  console.log('✨ Next steps:')
  console.log(`  cd ${targetDir}`)
  console.log('  npm install')
  console.log('  npm run dev')
  console.log('\n🚀 Vafast - 高性能、类型安全的 TypeScript Web 框架')
  console.log('⭐️ Star: https://github.com/vafast/vafast\n')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
