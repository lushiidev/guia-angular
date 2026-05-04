const { execSync } = require('child_process');
const path = require('path');

console.log('🏗️  Construyendo monolito...\n');

try {
  // 1. Compilar Frontend
  console.log('📦 Compilando Angular...');
  execSync('npm --prefix Frontend run build', { stdio: 'inherit' });
  console.log('✅ Frontend compilado.\n');

  // 2. Instalar dependencias del Backend (si es necesario)
  console.log('📥 Instalando dependencias del Backend...');
  execSync('npm --prefix Backend install', { stdio: 'inherit' });
  console.log('✅ Backend listo.\n');

  console.log('🎉 ¡Monolito construido! Listo para deployar en Render.');
  console.log('   Comando en Render: npm --prefix Backend start');
} catch (error) {
  console.error('❌ Error durante la construcción:', error.message);
  process.exit(1);
}
