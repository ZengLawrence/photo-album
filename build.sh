[ ! -d "./dist" ] && mkdir dist
cp -R *.js *.json LICENSE *.md ./album ./bin ./image ./public ./routes ./views ./dist
cp -R ./client/build ./dist
