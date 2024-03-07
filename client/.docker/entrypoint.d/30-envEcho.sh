#!/bin/bash

cat << EOF > /var/www/html/localEnv.script
<script>
  window.configs = {
    API: '$API',
    KEYCLOAK_ADMIN_URL: '$KEYCLOAK_ADMIN_URL',
    KEYCLOAK_ADMIN_REALM: '$KEYCLOAK_ADMIN_REALM',
    KEYCLOAK_ADMIN_CLIENT_ID: '$KEYCLOAK_ADMIN_CLIENT_ID',
  }
</script>
EOF
