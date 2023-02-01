Informação:
para executar o Next JS em desenvolvimento a partir da node_modules
*** ./node_modules/.bin/next dev

criar gitignore atraves do npx
*** npx gitignore node

scripts export: exporta uma pasta com arquivos estaticos
npm scripts: "build": "rm -rf build && next export && mv ./out ./build",
*** criando um workflow: descrevendo passos lógicos, 
atribuindo o comando rm -rf é realizado a remoção da pasta "out" (padrão do export),
criando uma nova basta com os arquivos mais atuais buildados e a renomeando para
"build", passo que é executado pelo comando mv <[oud name]> <[new name]>
 