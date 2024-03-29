O que é CI/CD

Definição: Em engenharia de software CI/CD pode se referir as práticas combinadas de integração e entrega continua.
CI/CD preenche as lacunas entre as atividades de equipes de desenvolvimento e operação, reforçando a automação na
compilação, teste e implementação de aplicativos.

Esteira continua:
Traça um plano => coda => builda => testa => lança => deploy => opera => monitora => (... inicio do ciclo)

Os devs escrevem os codigos e fazem seus commits, garantindo que o código está funcionando como antes.
CI - Garantir compatibilidade, Enquanto vc quer entregar o seu software (a nova featrure) é preciso garantir que o
novo caminho, ou o novo botao funcionem de acordo com o que ja existia
CD - Etapa de entrega, realizado o pull request é preciso garantir que seu produto está testado e compativel
com tudo oq ja existe


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

================================================================================================
Realizando deploy na Vercel

Para realizar esta ação é necessário realizar o build do projeto, visto que essa abordagem é utilizada para
deploies na Vercel quando se trata de aplicações com o ambiente diferente do ambiente padrão da vercel

yarn build - builda aplicação

npx vercel ./build --name projeto-curso-cicd-teste

Obs: utilizar --confirm --no-clipboard pois a flag --name está sendo descontinuada. Nesse caso o comando de no clipboard passa a url para que seja colada ao navegado e seguir.

é realizado um breve checklist ## obervação: "./" em In which directory is your code located
é apartir da pasta definida


* Para realizar o deploy em produção na vercel: é necessário utilizar algumas variáveis de ambiente e configurá-las no arquivo.yml
npm scripts: "deploy:prod": "yarn build && npx vercel ./build --confirm --no-clipboard --prod --token=$VERCEL_TOKEN"
```sh
env:
	VERCEL_TOKEN: "algumvalor"
	VERCEL_ORG_ID: "u5unvEWsQtBZcycyhpey1YdO"
	VERCEL_PROJECT_ID: "prj_V0S5KNTcRyXVCnUg9aGP4miNLmbU"
```
* é possível conseguir o vercel_org_id e vercel_project_id atravez da pasta .vercel que é gerada a partir da CLI.

* Criar token no site da Vercel:
perfil do usuário => setting => tokens => create token. É importante definir Full account para que haja acesso a toda a conta.

* Para configurar o token no arquivo.yml é preciso ir até as setting do github,
configurar uma nova secret and variables e criar um repository onde será
armazenado seu token

link doc github actions: https://docs.github.com/pt/actions/using-workflows/events-that-trigger-workflows


Ex:
# This is a basic workflow to help you get started with Actions

name: "CI (Integração continua) primeira action" # integração continua

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the "main" branch
  push:
    branches: [ "master" ]
  pull_request:
    types: [opened, synchronize]

  # Allows you to run this workflow manually from the Actions tab
  #workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel - defining what we want execute
jobs:
  # This workflow contains a single job called "build"
  example:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest # OS you can set to run your jobs

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v3 # get Git commands throught pre config

      # Runs a single command using the runners shell
      - name: Run a one-line script
        run: echo Hello, world!

      # Runs a listfiles command
      - name: Run a listfile
        run: ls -la


Vercel pull request preview:

* Suporte de previews que é associado ao pull request antes de ir para produção
para que cada commit novo gere um novo recurso.s
diretamente ligado aos conceitos de CI

Abordagem para melhorar a escrita de scripts no package.json
* criar-se uma pasta chamada scripts-ci para que atraves de um arquivo de scripts ela possa gerenciar os scripts a serem executados.

Ex: pullRequestPreview.js

comando de execução via CI: node ./scripts-ci/pullRequestPreview.js

lembrete:
para definir uma atualização via CI e garantir que ela não vá para produção é necessário criar ambientes onde isso seja possível. uma recomendação é sempre commitar para uma branch anterior a branch de produção.

Ex:

on:
	push:
		branches: [ develop, branch-anterior ]
  pull_request:
    types: [opened, synchronize]


Implementando Cypress para testes automatizados dentro do CI/CD

Por padrão o script de run do cypress: "cypress:open" executa cypress open - que entrega um ambiente de configuração feito no navegado.
Criando um ambiente de testes conforme pre-definido.

Para inibir esse comportamento com o Cypress é necessário utilizar o Script cypress que execute o comando "cypress run --config-file=cypress.config.js"
Isso fará que o ambiente de teste nao execute o navegador em um padrão de testes chamado de headless.

Dessa forma é possível rodar os testes em ambientes de CI, sendo possível verificar os logs e o retorno dos testes.
