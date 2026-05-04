const { spawn } = require('child_process');

function runProcess(name, commandLine) {
  const isWindows = process.platform === 'win32';
  const command = isWindows ? 'cmd.exe' : 'sh';
  const args = isWindows
    ? ['/d', '/s', '/c', commandLine]
    : ['-lc', commandLine];

  const child = spawn(command, args, {
    stdio: 'inherit',
  });

  child.on('error', (error) => {
    console.error(`[${name}] error:`, error.message);
  });

  return child;
}

const backend = runProcess('backend', 'npm --prefix Backend run dev');
const frontend = runProcess('frontend', 'npm --prefix Frontend start');

function shutdown() {
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
}

process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});

process.on('SIGTERM', () => {
  shutdown();
  process.exit(0);
});

backend.on('exit', (code) => {
  if (code !== 0) {
    frontend.kill('SIGINT');
    process.exit(code ?? 1);
  }
});

frontend.on('exit', (code) => {
  if (code !== 0) {
    backend.kill('SIGINT');
    process.exit(code ?? 1);
  }
});