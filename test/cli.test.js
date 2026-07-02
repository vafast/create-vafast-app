import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import assert from 'node:assert/strict'

const cliPath = new URL('../bin/index.js', import.meta.url).pathname
const repoRoot = new URL('..', import.meta.url).pathname

test('create-vafast-app accepts project name without prompt', () => {
  const workDir = mkdtempSync(join(tmpdir(), 'create-vafast-app-'))
  const projectName = 'demo-app'

  try {
    const result = spawnSync(
      process.execPath,
      [cliPath, projectName],
      {
        cwd: workDir,
        encoding: 'utf8',
      },
    )

    assert.equal(result.status, 0, result.stderr || result.stdout)
    assert.equal(existsSync(join(workDir, projectName, 'src/index.ts')), true)
    assert.match(result.stdout, /Vafast app created/)
  }
  finally {
    rmSync(workDir, { recursive: true, force: true })
  }
})

test('create-vafast-app --help exits cleanly', () => {
  const result = spawnSync(
    process.execPath,
    [cliPath, '--help'],
    { encoding: 'utf8' },
  )

  assert.equal(result.status, 0)
  assert.match(result.stdout, /Usage:/)
})

test('create-vafast-app uses default folder in non-tty mode', () => {
  const workDir = mkdtempSync(join(tmpdir(), 'create-vafast-app-'))

  try {
    const result = spawnSync(
      process.execPath,
      [cliPath],
      {
        cwd: workDir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    )

    assert.equal(result.status, 0, result.stderr || result.stdout)
    assert.equal(existsSync(join(workDir, 'my-vafast-app', 'package.json')), true)
  }
  finally {
    rmSync(workDir, { recursive: true, force: true })
  }
})
