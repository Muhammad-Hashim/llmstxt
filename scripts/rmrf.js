/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function rmrf(target) {
  const resolved = path.resolve(process.cwd(), target);
  if (!resolved.startsWith(process.cwd())) {
    throw new Error(`Refusing to delete outside CWD: ${resolved}`);
  }
  fs.rmSync(resolved, { recursive: true, force: true });
}

for (const arg of process.argv.slice(2)) {
  rmrf(arg);
}

