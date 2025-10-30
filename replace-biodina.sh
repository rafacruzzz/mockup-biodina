#!/bin/bash

# Script para substituir todas as ocorrências de "biodina" por "imuv" no projeto
# Mantém o case (Biodina -> Imuv, biodina -> imuv, BIODINA -> IMUV)

find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) -exec sed -i '' \
  -e 's/biodina-blue/imuv-blue/g' \
  -e 's/biodina-gold/imuv-gold/g' \
  -e 's/biodina-darkblue/imuv-darkblue/g' \
  -e 's/Biodina/Imuv/g' \
  -e 's/BIODINA/IMUV/g' \
  -e 's/biodina/imuv/g' \
  {} +

echo "Substituições concluídas!"
