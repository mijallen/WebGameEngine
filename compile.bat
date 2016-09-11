cd engine
::dir *.ts /b >engineScriptList.txt
call tsc @engineScriptList.txt ../scripts/script.ts --outFile ../pages/scripts/script.js
cd ..
