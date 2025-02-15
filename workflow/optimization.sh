npm install terser tsc
npm install less --save-dev

mkdir -p script
mkdir -p style
mkdir -p temp

work="workflow"

function clean() {
    rm -rf "src" "node_modules" "temp" "${work}"
    rm -f "package-lock.json" "package.json"
}

function build() {
  for file in src/js/*.js; do
    filename=$(basename "$file" .js)
    npx terser "$file" -o "script/${filename}.min.js" --compress --mangle
    echo "script/${filename}.min.js"
  done

  # shellcheck disable=SC2164
  cd "$work"
  for less_file in ../src/less/*.less; do
    file="./../temp/$(basename "${less_file%.less}.css")"
    npx lessc "$less_file" "$file" || exit 1
    npx postcss "$file" -o "./../style/$(basename "${less_file%.less}.min.css")" --use cssnano --no-map
    rm -f "$file"
  done
  cd ..


  

  #function process_html(file) {

  #}
  
  #for file in ../src/host/*.html; do
  #  process_html file
  #done

  #for file in ../src/host/*.htm; do
  #  process_html file
  #done
}

npm install terser tsc
npm install less --save-dev

# shellcheck disable=SC2164
cd "${work}"
npm install
cd ..

build
clean
