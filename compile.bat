cd engine
::dir *.ts /b >engineScriptList.txt
call tsc @engineScriptList.txt ../scripts/script.ts --target ES6 --outFile ../pages/scripts/script.js
cd ..
