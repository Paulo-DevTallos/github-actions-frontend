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

Eventos acionadores de workflows:
Podemos configurar a execução de fluxos de trabalho quando uma atividade específica acontece no
Github em um período agendado ou quando acontece fora dele como um evento externo. Os acionadores
de fluxo de trabalho são eventos que fazem com que um fluxo de trabalho seja executado.

Alguns eventos têm vários tipos de atividades. Para esses eventos, você pode especificar quais
tipos de atividade executam um fluxo de trabalho. Alguns deles são:

issua_comment: Executa o fluxo de trabalho quando um problema ou comentário de pull request é criado, editado ou excluído
```sh
on:
	issue_comment:
		types: [created, deleted]
```

page_build: Executa o fluxo de trabalho quando alguem faz push em uma branch que é a fonte de publicação para Github Pages
caso o Github pages esteja habilitado no repositório.
```sh
on:
	page_build:
```

push: Executa o fluxo de trabalho quando você faz push de um commit ou tag. Por exemplo, você pode executar um fluxo de
trabalho quando o evento <code>push</code> ocorrer
```sh
on:
	push:
```

Uma outra possibilidade é utilizando o filtro <code>branches</code> para quando alguém fizer um push para a main ou master ou
em alguma branch que começa com <code>releases/</code>
```sh
on:
	push:
		beanches:
			- 'main'
			- 'release/**'
```

Padronização de projeto com tratamento de erros a cerca da escrita de código:

Configuração do Prettier + Eslint

* para configurar o command do script "lint": "next lint" é preciso habilitar o prettier executando o comando do script lint,
isso fará que o arquivo eslintrc.json seja gerado. (dentro dele podemos realizar as configurações do lint)
* instalar como dev dependencies o prettier e o plugin "eslint-plugin-prettier"
{
  "extends": [
		"next/core-web-vitals",
		"plugin:prettier/recommended"
	]
}
configurando seu recurso dentro do eslintrc.json

Essas configurações fará que o eslint e o prettier monitorem todos os recursos a cerca de indentação de codigo,
aplicação de ponto e virgula, e recursos de correções

Ex: executando o comando do script lint após sua configuração, caso haja erros a serem tratados.
```sh
./pages/about.jsx
4:3  Error: Replace `<↹↹` with `↹<`  prettier/prettier

./pages/produtos.jsx
1:37  Error: Delete `␍`  prettier/prettier
2:10  Error: Delete `␍`  prettier/prettier
3:8  Error: Delete `␍`  prettier/prettier
4:31  Error: Delete `␍`  prettier/prettier
5:9  Error: Delete `␍`  prettier/prettier
6:3  Error: Replace `␍` with `;`  prettier/prettier
7:2  Error: Delete `␍⏎␍`  prettier/prettier
```

executando o script lint --fix é aplicada uma auto correção dos arquivos que estão por formatar

habilitando script fix para funcionar em dev:
"lint:fix": "next lint --fix"

link doc github actions: https://docs.github.com/pt/actions/using-workflows/events-that-trigger-workflows
