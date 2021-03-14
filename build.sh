[ ! -d "./dist" ] && mkdir dist
cp -R *.js *.json LICENSE *.md photo-album.sh ./album ./bin ./image ./public ./routes ./views ./dist
cp -R ./client/build ./dist