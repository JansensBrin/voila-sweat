#!/usr/bin/env bash
set -euo pipefail

cat > data.js <<'EOF'
const PRODUCTS = [
EOF

declare -A names
names["JH001"]="Sweat à capuche College"
names["JH030"]="Sweatshirt"
names["JH050"]="Sweat-shirt zippé"

first_product=true

for code in JH001 JH030 JH050; do
  dir="images/$code"
  [ -d "$dir" ] || continue

  if [ "$first_product" = false ]; then
    echo "," >> data.js
  fi
  first_product=false

  echo "  {" >> data.js
  echo "    code: \"$code\"," >> data.js
  echo "    name: \"${names[$code]}\"," >> data.js
  echo "    images: [" >> data.js

  first=true
  while IFS= read -r file; do
    filename="$(basename "$file")"
    if [ "$first" = false ]; then
      echo "," >> data.js
    fi
    first=false
    printf '      "%s"' "$filename" >> data.js
  done < <(find "$dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | sort)

  echo "" >> data.js
  echo "    ]" >> data.js
  echo "  }" >> data.js
done

cat >> data.js <<'EOF'
];
EOF

echo "data.js généré."
