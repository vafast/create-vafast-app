import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import assert from 'node:assert/strict'

const templateDir = new URL('../templates/node-vafast', import.meta.url).pathname

test('template project typechecks against current vafast API', () => {
  const workDir = mkdtempSync(join(tmpdir(), 'create-vafast-app-template-'))

  try {
    cpSync(templateDir, workDir, { recursive: true })

    const installResult = spawnSync('npm', ['install'], {
      cwd: workDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    assert.equal(installResult.status, 0, installResult.stderr || installResult.stdout)

    const typecheckResult = spawnSync('npx', ['tsc', '--noEmit'], {
      cwd: workDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    assert.equal(
      typecheckResult.status,
      0,
      typecheckResult.stderr || typecheckResult.stdout,
    )
    assert.equal(existsSync(join(workDir, 'node_modules/vafast/package.json')), true)
  }
  finally {
    rmSync(workDir, { recursive: true, force: true })
  }
})
