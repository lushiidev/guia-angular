#!/bin/sh
set -e

cat > /usr/share/nginx/html/env.js <<EOF
window.__env = {
  apiUrl: "${API_URL:-http://localhost:3000}"
};
EOF

exec nginx -g 'daemon off;'