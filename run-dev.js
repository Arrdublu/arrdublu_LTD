import { spawn } from 'child_process';

const args = process.argv.slice(2);
const cleanArgs = [];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--host') {
    // Next.js uses "-H" or "--hostname". Translate --host into -H
    cleanArgs.push('-H');
    if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
      cleanArgs.push(args[i + 1]);
      i++;
    }
  } else if (arg.startsWith('--host=')) {
    const val = arg.split('=')[1];
    cleanArgs.push('-H', val);
  } else {
    cleanArgs.push(arg);
  }
}

// Ensure default parameters are present if not already passed, prioritizing port 3000 and 0.0.0.0
if (!cleanArgs.includes('-p') && !cleanArgs.some(a => a.startsWith('--port'))) {
  cleanArgs.push('-p', '3000');
}
if (!cleanArgs.includes('-H') && !cleanArgs.some(a => a.startsWith('--hostname'))) {
  cleanArgs.push('-H', '0.0.0.0');
}

console.log('[Dev Wrapper] Spawning next dev with cleaned options:', cleanArgs);

const child = spawn('npx', ['next', 'dev', ...cleanArgs], {
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
