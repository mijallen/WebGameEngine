cd engine
# ls *.ts >engineScriptList.txt
tsc @engineScriptList.txt ../scripts/script.ts --outFile ../pages/scripts/script.js
cd ..
