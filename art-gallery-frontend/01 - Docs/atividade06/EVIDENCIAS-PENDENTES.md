# Evidências pendentes — Atividade 06

**As imagens abaixo devem ser capturadas de execuções reais do projeto.** Nenhum print ilustrativo ou simulado foi usado como evidência.

Na pasta `01 - Docs/atividade06/`, salvar:

1. `registro-antes.jpg` — tela de Registro da versão anterior (Aula 05), ainda sem a refatoração visual; pode ser aberta em cópia separada do projeto.
2. `registro-depois.jpg` — tela de Registro da versão atual, utilizando `FormCard`, `BaseInput` e `BaseButton`.
3. `tres-telas-consistentes.jpg` — Registro, Login e Meu Perfil lado a lado, com a identidade visual roxa do ArtGallery.
4. `navbar-logado-deslogado.jpg` — Navbar de visitante mostrando **Entrar / Criar Conta** e Navbar autenticada mostrando **Galeria / avatar + usuário / Sair**. A área administrativa aparece somente para administradores.

**Atenção ao teste da Navbar:** duas janelas normais do mesmo navegador compartilham `localStorage`, portanto podem mostrar ambas o usuário logado, mesmo quando uma está na tela de Login. Use uma janela anônima para o cenário deslogado, ou saia realmente da sessão antes do primeiro print. Estar na URL `/login` não prova que houve logout.

## Regressão antes da entrega

- Registro concluído e redirecionado ao Login.
- Login e redirecionamento à Galeria.
- Sidebar ao lado da área principal em telas grandes, sem empurrar o formulário para baixo.
- Navbar correta antes/depois de entrar e depois de clicar em Sair.
- Perfil: dados carregados, nome, biografia, contador e preview da imagem.
- Salvar foto e conferir mudança do avatar **na própria Navbar, sem F5**.
- Deslogado: acesso direto a `/profile/me` redirecionado ao Login.
- Console do navegador sem erros novos.

**Execução:** iniciar MariaDB, API e front-end em terminais separados. Se os pacotes estiverem copiados de outro sistema operacional, executar `npm install` em cada pasta antes de `npm run dev`.

O enunciado exige dois ZIPs separados (API e front-end, sem `node_modules`) na entrega ao professor. O ZIP único recebido/gerado aqui preserva a estrutura do ArtGallery para continuidade e correções; compacte as duas subpastas separadamente quando finalizar os prints.

**Privacidade:** confira e não compartilhe arquivos `.env` com senhas reais na entrega final ao professor. Use arquivos `.env.example` sem credenciais, caso a turma tenha adotado esse padrão.
