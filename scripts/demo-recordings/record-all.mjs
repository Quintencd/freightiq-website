import { spawn } from 'node:child_process';
import { moduleDemos } from './modules.mjs';

const requested = process.argv.slice(2);
const demos = requested.length
  ? moduleDemos.filter((demo) => requested.includes(demo.id) || requested.includes(demo.asset))
  : moduleDemos;

if (!demos.length) {
  console.error('No matching module ids.');
  process.exit(1);
}

const failed = [];

for (const demo of demos) {
  console.log(`\n=== Recording ${demo.id} ===`);
  const code = await run('node', ['scripts/demo-recordings/record-module.mjs', demo.id]);
  if (code !== 0) failed.push(demo.id);
}

if (failed.length) {
  console.error(`Failed modules: ${failed.join(', ')}`);
  process.exit(1);
}

console.log(`Recorded ${demos.length} module walkthroughs.`);

function run(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('exit', (code) => resolve(code || 0));
  });
}
