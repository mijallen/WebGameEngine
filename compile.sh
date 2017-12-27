cd engine
# ls *.ts >engineScriptList.txt
tsc @engineScriptList.txt ../scripts/script.ts --target ES6 --outFile ../pages/scripts/script.js
cd ..
