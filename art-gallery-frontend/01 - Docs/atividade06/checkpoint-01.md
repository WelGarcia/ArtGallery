# Checkpoint 01 — ArtGallery — Aula 06

## Parte A — Auditoria das camadas da API

**Base da revisão:** orientações das Aulas 01 a 06 das trilhas API e Front-end; projeto adaptado do roteiro Shortz-App para o tema oficial **ArtGallery (exposição de arte digital)**.

1. **Há lógica de negócio nos arquivos `*Routes.js`?** Não. `modules/search/searchRoutes.js` e `modules/user/userRoutes.js` definem métodos HTTP, caminhos, validadores, autenticação, upload e handlers; não acessam diretamente o banco.
2. **Algum Controller consulta o Model?** Não. `searchController` delega a `searchService`; `userController` delega a `userService`.
3. **Algum Service usa `req` ou `res`?** Não. Os Services recebem argumentos e devolvem dados ou lançam erros. A camada HTTP permanece nos controllers/middlewares.
4. **Os Controllers usam o padrão `success()/error()`?** Sim para todas as respostas de sucesso (`success()`). Erros são lançados pelos serviços/validação e convertidos por `errorHandler.js`, que chama `error()` de `apiResponse.js`. Não existe `res.json()` manual nos controllers.
5. **Rotas assíncronas usam `asyncHandler`?** Sim, nas rotas de usuário. A rota de busca permanece síncrona nesta etapa, portanto não precisa de `asyncHandler`.
6. **As validações de entrada usam `express-validator`?** Sim. Cadastro, login e atualização de perfil usam `userValidator.js` (incluindo validação personalizada dentro do `express-validator`). As condições nos serviços (duplicidade, credenciais e existência do usuário) são verificações de negócio, não validações de formato feitas no controller.
7. **Os status de erro seguem os contratos das aulas anteriores?** Sim: os erros de entrada são `400`, ausência de autenticação é `401`, usuário inexistente é `404`. Duplicidade no cadastro e senha incorreta preservam o `500` documentado nos roteiros, embora não seja a escolha mais comum em APIs de produção.
8. **`config/constants.js` está consistente?** `USERNAME_MIN`, `USERNAME_MAX`, `PASSWORD_MIN` e `BIO_MAX` estão declaradas e efetivamente usadas no validador. `BIO_MAX` aparece uma única vez na validação do back-end, com limite de 255. `DESCRIPTION_MAX` consta no roteiro de vídeos do sistema de referência, mas não foi criada no ArtGallery, pois o cadastro de obras ainda não faz parte desta etapa.
9. **O serviço de atualização utiliza `fs` e `path`?** Sim. Ambos já eram importados na base recebida, conforme a observação da Aula 06 da API; nenhum pacote adicional é necessário para essa finalidade.

## Contratos anteriores corrigidos durante a auditoria

Durante a conferência das **Aulas 04 e 05**, foram identificadas divergências existentes antes do Checkpoint 06. Para não entregar falhas de funcionalidades já exigidas, foram feitos ajustes pontuais no módulo `user`, mantendo as rotas atuais:

- **Aula 04:** `POST /api/login` agora aceita o identificador `login` (e-mail ou nome de usuário), como especificado no roteiro, mantendo a entrada antiga `email` por compatibilidade com os testes anteriores.
- **Aula 05:** `PUT /api/profile/me` agora recebe o campo de imagem `profilePicture` do roteiro e continua aceitando `photo`, utilizado na versão anterior do ArtGallery.

**Nota sobre o escopo:** a Aula 06 da API propõe não escrever código novo. As alterações acima não acrescentam rotas ou funcionalidades futuras: são correções de compatibilidade em contratos já previstos nas Aulas 04 e 05, solicitadas pela revisão acumulada das seis aulas.

## Validação realizada em ambiente de revisão

- **19 cenários HTTP da API aprovados** por servidor Express real e modelos persistentes simulados em memória (sem conectar ao MariaDB pessoal). Incluem status da API, busca, cadastro válido/inválido/duplicado, login por e-mail e usuário, senha errada, JWT ausente/válido, edição com e sem imagem, substituição e exclusão de imagem antiga, serviço estático da foto, limite da bio, logout e 404.
- **Sintaxe dos scripts da API verificada**, sem erros.
- **16 componentes Vue analisados e compilados individualmente** com `@vue/compiler-sfc`, sem erros de script ou template.
- **Scripts JavaScript do front-end verificados**, sem erros de sintaxe.

### Validações ainda obrigatórias na máquina do aluno

- Rodar a API conectada ao MariaDB real e repetir os endpoints dos roteiros.
- Executar `npm install` e `npm run dev` no Windows para confirmar o front-end e inspecionar o Console e a aba Network.
- Validar cadastro, login, guarda de rota, logout, layout, preview, upload, atualização imediata da foto na Navbar e a consistência visual dos três formulários.
- Capturar os quatro arquivos de evidência de tela solicitados pelo enunciado.

**Limitação da validação automática:** o `npm run build` do Vite não pôde ser executado neste ambiente Linux porque o `node_modules` recebido contém a variante nativa de Windows do Rolldown/Vite; não foi possível instalar a variante Linux por indisponibilidade de rede. A compilação individual de todos os componentes Vue foi concluída com sucesso, mas não substitui integralmente um build do Vite.
