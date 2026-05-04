const { execSync } = require('child_process');

console.log('🏗️  Construyendo monolito...\n');

try {
  // 1. Compilar Frontend
  console.log('📦 Compilando Angular...');
  execSync('npm --prefix Frontend run build', { stdio: 'inherit' });
  console.log('✅ Frontend compilado.\n');

  console.log('🎉 ¡Monolito construido! Listo para deployar en Render.');
  console.log('   Comando en Render: npm start');
} catch (error) {
  console.error('❌ Error durante la construcción:', error.message);
  process.exit(1);
}
