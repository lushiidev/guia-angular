const { execSync } = require('child_process');
const path = require('path');

console.log('🏗️  Construyendo monolito...\n');

try {
  // 1. Compilar Frontend
  console.log('📦 Compilando Angular...');
  const angularCliBin = path.join('Frontend', 'node_modules', '@angular', 'cli', 'bin', 'ng.js');
  execSync(`node ${angularCliBin} build`, { stdio: 'inherit' });
  console.log('✅ Frontend compilado.\n');

  console.log('🎉 ¡Monolito construido! Listo para deployar en Render.');
  console.log('   Comando en Render: npm start');
} catch (error) {
  console.error('❌ Error durante la construcción:', error.message);
  process.exit(1);
}
