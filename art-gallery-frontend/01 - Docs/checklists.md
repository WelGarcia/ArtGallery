# Checklists das Atividades

## Aula 01

- [x] API criada e configurada.
- [x] Estrutura de pastas do backend criada.
- [x] Padrão único de resposta da API configurado.
- [x] `GET /api` funcionando.
- [x] CORS configurado.
- [x] Frontend Vite + Vue criado.
- [x] Estrutura de pastas do frontend criada.
- [x] Vue Router configurado.
- [x] Layout base criado.
- [x] Landing Page integrada à API.
- [x] Teste de CORS realizado e corrigido.

## Aula 02 — Parte A: Backend

### Etapa 1 — Módulo search
- [x] Pasta `modules/search/` criada.
- [x] `searchService.js` criado com o campo `artworks`.

### Etapa 2 — Controller
- [x] `searchController.js` criado usando `exports.search`.
- [x] Objeto retornado usa `artworks`, igual ao service.

### Etapa 3 — Rota
- [x] `searchRoutes.js` criado com `router.get('/search', searchController.search)`.

### Etapa 4 — Registro do módulo
- [x] `searchRoutes` importado em `app.js`.
- [x] `app.use('/api', searchRoutes)` adicionado.
- [x] API reiniciada localmente sem erros.

### Etapa 5 — Testes isolados
- [x] `curl .../api/search?q=teste` validado no terminal.
- [x] `curl .../api/search` validado com `query: ""`.
- [x] `curl .../api` confirmado após a alteração.

## Aula 02 — Parte B: Frontend

### Etapa 1 — Instância única do Axios
- [x] `src/services/api.js` criado com `axios.create(...)` e `VITE_API_URL`.

### Etapa 2 — Interceptor
- [x] Interceptor de resposta adicionado a `api.js`.
- [x] Comentário explicando os ramos do interceptor adicionado no topo do arquivo.

### Etapa 3 — Services
- [x] `authService.js` criado com `register`, `login` e `logout`.
- [x] `searchService.js` criado com `params: { q: query }`.
- [x] `systemService.js` criado.

### Etapa 4 — Landing Page
- [x] `LandingView.vue` refatorada para usar `getApiStatus()` em vez de `fetch`.
- [x] Landing validada localmente exibindo `Status da API: online`.

### Etapa 5 — Validação da busca
- [x] Console validado com `Busca OK:` e objeto contendo `query`, `artworks` e `users`.
- [x] Erro de rede provocado com a API desligada e mensagem amigável validada.
- [x] Landing entregue sem o bloco temporário `search('a')`.

## Aula 03 — Parte A: Backend

### Etapa 1 — Dependências
- [x] `sequelize`, `mysql2`, `bcryptjs` e `express-validator` adicionados às dependências do projeto.

### Etapa 2 — Banco de Dados
- [x] Banco `artgallery_db` criado no MySQL local.
- [x] `.env` preparado com `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e `DB_PASSWORD`.
- [x] `config/database.js` criado.

### Etapa 3 — Constantes
- [x] `config/constants.js` criado.

### Etapa 4 — Módulo user
- [x] `userModel.js` criado com `artworksCount`.
- [x] `userValidator.js` criado.
- [x] `userService.js` criado com `getPublicProfile` usando `artworksCount`.
- [x] A senha/hash não é devolvida nas respostas.
- [x] `middlewares/asyncHandler.js` criado.
- [x] `middlewares/errorHandler.js` criado.
- [x] `userController.js` e `userRoutes.js` criados.

### Etapa 5 — Registro do módulo
- [x] `userRoutes` e `errorHandler` importados e registrados em `app.js` na ordem solicitada.
- [x] Terminal validado exibindo `Banco de dados sincronizado!`.
- [x] Tabela `users` confirmada no MySQL com as colunas do Model.

### Etapa 6 — Testes da API
- [x] Cadastro com sucesso responde `201` com `{ id, username, email }`.
- [x] Senha curta responde `400` com a mensagem correta.
- [x] Cadastro duplicado responde `500` conforme o roteiro.
- [x] `GET /profile/:username` confirma os dados persistidos.

## Aula 03 — Parte B: Frontend

### Etapa 1 — Contrato da API
- [x] Regras de cadastro replicadas no formulário do frontend.

### Etapa 2 — Navbar
- [x] Link clicável `Criar Conta` para `/register` disponível na Navbar.

### Etapa 3 — Formulário controlado
- [x] Formulário usa `v-model` em todos os campos.
- [x] `errors` e `apiErrorMessage` configurados.

### Etapa 4 — Validação client-side
- [x] `validate()` replica os limites do backend.
- [x] Mensagens de erro validadas no navegador conforme os campos são corrigidos.

### Etapa 5 — Integração com a API
- [x] Envio usa `authService.register()`.
- [x] Cadastro válido está configurado para navegar para `/login`.
- [x] Erros da API são exibidos em `apiErrorMessage`.
- [x] Envio vazio conferido na aba Network sem chamada de rede.
- [x] Cadastro duplicado conferido no navegador com a mensagem real da API.

### Etapa 6 — Teste prático
- [x] Cinco comportamentos do roteiro testados localmente.
- [x] `curl` confirmou a persistência do cadastro feito pela tela.

## Aula 03 — Entrega
- [x] Subpasta `01 - Docs/atividade03` criada com a ficha atualizada.
- [x] `tabela-users.jpg` adicionado após teste local no MySQL.
- [x] `curl-cadastro-sucesso.jpg` adicionado após teste local.
- [x] `curl-erro-validacao.jpg` adicionado após teste local.
- [x] `curl-erro-duplicidade.jpg` adicionado após teste local.
- [x] `curl-profile.jpg` adicionado após teste local.
- [x] `registro-erros.jpg` adicionado após teste local no navegador.
- [x] `registro-duplicidade-network.jpg` adicionado após teste local no DevTools.


## Aula 04 — Parte A: Backend
- [x] `jsonwebtoken` adicionado às dependências.
- [x] `.env` atualizado com `JWT_SECRET` e `JWT_EXPIRES_IN`.
- [x] `config/jwt.js` criado com geração e verificação de tokens.
- [x] `middlewares/auth.js` criado com `isAuthenticated`.
- [x] `userService.js` atualizado com `loginUser` e `getUserProfile`.
- [x] `userValidator.js` atualizado com `loginValidator`.
- [x] `userController.js` atualizado com `login`, `logout` e `getMyProfile`.
- [x] `userRoutes.js` atualizado, com `/profile/me` antes de `/profile/:username`.
- [x] Login com sucesso testado localmente e print salvo em `atividade04`.
- [x] Senha errada retornando 500 testada localmente e print salvo.
- [x] `GET /profile/me` sem token retornando 401 testado e print salvo.
- [x] `GET /profile/me` com token válido testado e print salvo.
- [x] `GET /profile/me` com token inválido retornando 401 testado e print salvo.

## Aula 04 — Parte B: Frontend
- [x] `createPinia()` registrado antes de `.use(router)`.
- [x] `stores/auth.js` criado com persistência via `localStorage`.
- [x] Interceptor de requisição adiciona `Authorization: Bearer <token>`.
- [x] Interceptor de resposta limpa a sessão e redireciona em qualquer 401.
- [x] Chaves do `localStorage` são iguais na store e nos interceptors.
- [x] Bootstrap 5 CSS incluído via CDN.
- [x] `assets/main.css` criado com a cor de marca `#6F42C1`.
- [x] Tela de Login criada com Bootstrap e `authStore.login(...)`.
- [x] Destino padrão pós-login ajustado para `/gallery`.
- [x] Guarda de rota criado para `requiresAuth: true`.
- [x] `useAuthStore()` é chamado dentro do callback do guarda.
- [x] Navbar varia conforme o estado de autenticação.
- [x] Logout limpa a sessão e redireciona para Login.
- [x] Login/redirecionamento testado no navegador e print salvo.
- [x] Persistência após F5 conferida no `localStorage`.
- [x] Redirecionamento deslogado com `?redirect=...` testado e print salvo.
- [x] Retorno à rota original após login testado.
- [x] Console com `Perfil autenticado OK:` registrado e print salvo.
- [x] Token adulterado testado, comprovando logout automático, e print salvo.


## Aula 05 — Parte A: Backend
- [x] Pasta `public/uploads/profiles/` criada com `default-profile.png`.
- [x] `multer` adicionado às dependências do projeto.
- [x] `BIO_MAX: 255` adicionado a `config/constants.js`.
- [x] `middlewares/profileMulter.js` criado.
- [x] `path` e `express.static` adicionados antes das rotas da API.
- [x] `profileUpdateValidator`, `updateUserProfile`, `updateProfile` e `PUT /profile/me` criados.
- [x] Atualização sem foto testada localmente, mantendo a foto atual.
- [x] Atualização com foto nova testada localmente e remoção da foto antiga confirmada.
- [x] `GET /uploads/profiles/<arquivo>` testado localmente com resposta 200.
- [x] Bio acima de 255 caracteres testada localmente com resposta 400.

## Aula 05 — Parte B: Frontend
- [x] Link `Meu Perfil` adicionado à Navbar e exibido somente quando logado.
- [x] `.env` atualizado com `VITE_MEDIA_URL`.
- [x] `src/utils/media.js` criado.
- [x] `updateProfile(formData)` adicionada com sobrescrita local do `Content-Type`.
- [x] `views/profile/MyProfileView.vue` criada com dados reais, validação, preview local e upload.
- [x] Tela carregando dados reais testada a partir da LandingPage.
- [x] Preview local testado com a aba Network sem nova chamada.
- [x] Salvamento com e sem troca de foto testado localmente.

## Aula 05 — Entrega
- [x] Subpasta `01 - Docs/atividade05` criada.
- [x] `perfil-carregado.jpg` adicionado após teste local.
- [x] `preview-local.jpg` adicionado após teste local.
- [x] `upload-multipart.jpg` adicionado após teste local.
- [x] `navbar-link-perfil.jpg` adicionado após teste local.
- [x] Prints de cada curl da Etapa 7 (Parte A) adicionados após os testes locais.


## Aula 06 — Parte A: Backend
- [x] Camadas `Routes → Controllers → Services → Model` revisadas em `atividade06/checkpoint-01.md`.
- [x] Contratos preexistentes de login (Aula 04) e foto de perfil (Aula 05) reconciliados sem criar rotas futuras.
- [x] Verificação de sintaxe da API concluída.
- [x] 19 verificações HTTP concluídas com banco simulado em memória (não substitui MariaDB).
- [x] Endpoints retestados com o MariaDB real no computador do aluno.

## Aula 06 — Parte B: Frontend
- [x] Bootstrap Icons incluído via CDN.
- [x] `BaseInput`, `BaseButton` e `FormCard` criados e revisados em `src/components/base/`.
- [x] Registro, Login e Perfil refatorados para componentes-base e identidade visual do ArtGallery.
- [x] `BaseInput` usa `defineModel()`, suporta `disabled` e slot `#hint` para contador da bio.
- [x] `src/composables/useAuth.js` centraliza autenticação, usuário e atualização de perfil.
- [x] Guarda de rota, Navbar e Sidebar usam `useAuth()`.
- [x] `App.vue` utiliza contêiner e linha Bootstrap com Sidebar ao lado do conteúdo.
- [x] Navbar mostra Entrar/Criar Conta deslogado e avatar/usuário/Sair logado.
- [x] `auth.js` atualiza o usuário após salvar o perfil e permite refletir a foto na Navbar sem F5.
- [x] Nenhum link para funcionalidade futura foi adicionado.
- [x] 16 componentes `.vue` passaram na compilação individual de scripts e templates.
- [x] Build completo do Vite confirmado no Windows (variante nativa do Linux indisponível aqui).
- [x] Cadastro testado e redirecionamento para Login comprovado no navegador.
- [x] Login testado e redirecionamento para Galeria comprovado no navegador.
- [x] Navbar e Sidebar testadas logado e deslogado com sessões distintas.
- [x] Perfil testado com MariaDB real, edição, upload e avatar atualizado sem F5.
- [x] Guarda de rota testado sem autenticação.
- [x] Console do DevTools verificado sem erros novos.

## Aula 06 — Entrega
- [x] `checkpoint-01.md` em `01 - Docs/atividade06/`.
- [x] Documentação de evidências pendentes atualizada.
- [x] `registro-antes.jpg` e `registro-depois.jpg` capturados.
- [x] `tres-telas-consistentes.jpg` capturado.
- [x] `navbar-logado-deslogado.jpg` capturado.
- [x] ZIP do back-end sem `node_modules` preparado após validação local.
- [x] ZIP do front-end sem `node_modules` preparado após validação local.


## Aula 07 — Backend e Frontend
- [x] Model Artwork e associação com User configurados.
- [x] Multer para upload de uma imagem configurado.
- [x] Validações e rota POST /api/artworks/upload implementadas.
- [x] Contador artworksCount incrementado pelo service.
- [x] Formulário de envio, prévia e progresso implementados.
- [x] Link Enviar Obra na Navbar e rota protegida adicionados.
- [x] Banco e upload real validados localmente.
- [x] Cinco testes curl executados e fotografados.
- [x] Prints do formulário, progresso, Network e Navbar capturados.
- [x] Checklist de alcançabilidade confirmado após teste no navegador.

## Aula 08 — API e Frontend (ArtGallery, Grupo B: imagem única)

### Parte A — Backend
- [x] Middleware `optionalAuth.js` criado (sem token não bloqueia).
- [x] `GET /api/artworks/:id` implementada com `optionalAuth`.
- [x] `include` com dados públicos de `User` (sem senha) implementado.
- [x] Coluna `views` adicionada ao model `Artwork`, valor inicial 0.
- [x] Incremento de `views` e `isOwner` implementados no detalhe.
- [x] `getFeedArtworks` implementado com paginação `page/limit`, `offset` e ordenação por data.
- [x] `GET /api/feed` implementada em `userRoutes.js`, protegida por `isAuthenticated`.
- [x] Streaming/Range/206 verificado como **não aplicável ao Grupo B**.
- [x] Teste real: detalhe sem token → 200, `isOwner: false`, `views` incrementada.
- [x] Teste real: detalhe com token do dono → 200, `isOwner: true`, `views` incrementada.
- [x] Teste real: detalhe de obra inexistente → 404.
- [x] Teste real: feed sem token → 401.
- [x] Teste real: feed com token, `?page=1&limit=1` → um item.
- [x] Teste real: feed com token, `?page=2&limit=1` → segundo item ou `[]`.
- [x] Regressão real: upload (Aula 07), login (Aula 04) e perfil (Aula 05) funcionando.

### Parte B — Frontend
- [x] `getArtworkUrl` implementada em `utils/media.js` para mídia de imagem do Grupo B.
- [x] CSS de card adaptado para imagem 4:3 e imagem de detalhe em resolução original.
- [x] `getArtworkById` e `getFeed` implementadas nos serviços correspondentes.
- [x] `ArtworkCard.vue` criado como componente reutilizável.
- [x] Placeholder `GalleryView.vue` substituído por feed de obras reais paginado.
- [x] `ArtworkDetailView.vue` criada com imagem grande, autor, descrição e views.
- [x] `isOwner` mantido no objeto carregado para uso futuro, sem ações de edição.
- [x] Rota pública `/artworks/:id` implementada e acessível a partir do card.
- [x] `watch(route.params.id)` implementado para mudança entre obras.
- [x] Teste real: galeria exibindo imagem, título, autor e views.
- [x] Teste real: navegar do card ao detalhe sem recarga da página.
- [x] Teste real: imagem do detalhe carrega em resolução original.
- [x] Teste real: contador de views aumenta a cada carregamento do detalhe.
- [x] Teste real: obra inexistente exibe erro sem quebrar a tela.
- [x] Teste real: paginação "Carregar mais" ou ausência quando só há uma página.

### Evidências e entrega
- [x] `atividade08/feed-real.jpg` capturado no navegador.
- [x] `atividade08/detalhe-real.jpg` capturado no navegador.
- [x] `range-206.jpg` **não se aplica ao Grupo B** (não criar arquivo falso).
- [x] Prints de cada teste curl da Parte A salvos em JPG na pasta `atividade08/`.
- [x] Arquivos da API e do Frontend preparados para empacotamento sem `node_modules`.


## Aula 09 — Parte A: Backend (Grupo B: imagem única)
- [x] Correção da Aula 08 (`reload()` após `increment()`) já presente e preservada.
- [x] `GET /api/my-artworks` criado, protegido por autenticação e ordenado por data decrescente.
- [x] `GET /api/artworks/:id/edit` criado com 404 antes de 403 e sem incremento de views.
- [x] `PUT /api/artworks/:id` usa Multer `.single('image')` antes do validador e permite imagem opcional.
- [x] Substituição de imagem apaga o arquivo antigo **após** salvar no banco.
- [x] `DELETE /api/artworks/:id` verifica dono, exclui registro, decrementa `artworksCount` e remove a imagem.
- [x] Os quatro handlers do controller e as quatro rotas do exercício foram criados.
- [x] `getPublicProfile` com associação `Artworks`, atributos públicos e ordenação.
- [x] Perfil público devolve `isOwner` e usa `optionalAuth` após `/profile/me`.
- [x] `errorHandler.js` apaga `req.file`/`req.files` órfãos e continua como último middleware.
- [x] Testes automatizados isolados do service para 403, 404, ordenação, edição com/sem imagem e exclusão; limpeza de órfãos e `isOwner`.
- [x] Testes curl reais 1 a 7, com duas contas e MariaDB (executar no computador do aluno).
- [x] Contagens de arquivos antes/depois dos testes 4, 5 e 6 fotografadas em JPG.

## Aula 09 — Parte B: Frontend
- [x] `useClickOutside.js` criado e ligado à Navbar.
- [x] `BaseModal.vue` criado com slots, Esc, clique fora e estado `busy`.
- [x] Services `getMyArtworks`, `getArtworkForEdit`, `updateArtwork`, `deleteArtwork`, `getPublicProfile` criados.
- [x] `ArtworkCard.vue` refatorado com autor clicável/opcional, três links independentes e slot actions.
- [x] Menu do avatar com Editar Perfil, Ver Perfil, Minhas Obras e Sair criado.
- [x] `PublicProfileView`, `MyArtworksView`, `EditArtworkView` criadas e ligadas ao router.
- [x] `ArtworkDetailView` com autor clicável e Editar condicional para o dono.
- [x] `UploadArtworkView` mostra link “Ver em Minhas Obras” após envio.
- [x] Validação sintática dos componentes Vue por compilador SFC (8 componentes novos/modificados).
- [x] Testes visuais reais do menu/avatar, perfil próprio/outro/anônimo, modal e edição.
- [x] Testes reais de autorização, upload, multipart, exclusão, erro de validação e regressão.
- [x] `menu-avatar.jpg`, `perfil-publico.jpg`, `modal-exclusao.jpg`, `editar.jpg` capturados.
- [x] Prints dos testes curl e contagens na subpasta `atividade09/Testes curl/`.

## Aula 09 — Entrega
- [x] `atividade09/respostas.md` com respostas das cinco questões da Seção 1.
- [x] Guia de testes, prints e entrega preparado.
- [x] ZIP da API sem `node_modules` preparado.
- [x] ZIP do front-end sem `node_modules` preparado.
- [x] ZIP completo de continuidade preparado.
- [x] Evidências JPG reais adicionadas aos ZIPs antes do envio ao professor.


## Aula 10 — Parte A: Backend
- [x] `COMMENT_MAX`, `likesCount` e `commentsCount` adicionados.
- [x] Models `Like` e `Comment` criados; índice único composto em `likes`.
- [x] Associações dos dois lados com User e Artwork configuradas.
- [x] Módulo like com três rotas e registro no `app.js`.
- [x] Módulo comment com duas rotas, validação e registro no `app.js`.
- [x] Escritas de like/comment e contador dentro de transação.
- [x] Detalhe da obra devolvendo `isLiked` e contadores.
- [x] Exclusão de obra limpando curtidas e comentários na transação.
- [x] Contadores das obras no perfil público.
- [x] `.trim()` confirmado/movido para antes da validação dos campos obrigatórios.
- [x] Tabelas, colunas e índice confirmados no MariaDB local.
- [x] Testes reais de 401/404/201/200, toggle, status, lista e contadores confirmados.
- [x] INSERT duplicado rejeitado pelo banco, print `unique.jpg` salvo.
- [x] Comentários reais (401/400/404/201; 501 caracteres; texto aparado e autor) confirmados.
- [x] Exclusão real confirmou limpeza das curtidas/comentários e imagem.
- [x] Regressões da API (upload, detalhe, galeria/feed, edição e perfil) confirmadas.

## Aula 10 — Parte B: Frontend
- [x] Services `likeService.js` e `commentService.js` criados.
- [x] Formatador de datas e CSS de texto preservando quebras adicionados.
- [x] `LikeButton` com atualização otimista, rollback e `isBusy`.
- [x] Visitante redirecionado ao login com URL de retorno.
- [x] `CommentSection` com carregando/erro/vazio e formulário validado.
- [x] Comentário novo inserido no topo; HTML escapado por interpolação Vue.
- [x] Detalhe da obra com LikeButton e CommentSection.
- [x] Contadores no ArtworkCard utilizado na Galeria, Perfil e Minhas Obras.
- [x] Tela Obras Curtidas, rota protegida e links no menu e Sidebar.
- [x] Componentes Vue validados por compilador SFC; scripts da API com sintaxe validada.
- [x] Login/retorno do visitante, curtida e recarga F5 testados no navegador.
- [x] Slow 4G e Offline testados, prints `otimista.jpg` e `rollback.jpg` salvos.
- [x] Comentário de duas linhas, erros client-side e teste HTML/XSS confirmados no navegador.
- [x] Contadores e estado vazio conferidos em todas as telas.
- [x] Exclusão de obra com curtidas verificada com contas A e B.
- [x] Regressões de Galeria, Perfil, Minhas Obras, Upload e Login/Logout validadas.

## Aula 10 — Entrega
- [x] Subpasta `atividade10` criada.
- [x] `atividade10/respostas.md` preenchido com as seis respostas.
- [x] Guia com nomes dos prints e testes necessários preparado.
- [x] `detalhe-interacao.jpg` capturado.
- [x] `otimista.jpg` capturado.
- [x] `rollback.jpg` capturado.
- [x] `curtidos.jpg` capturado.
- [x] `unique.jpg` capturado.
- [x] JPGs dos comandos curl efetivamente requeridos, conforme a Parte A/Etapa 4, capturados.
- [x] Todos os testes da Aula 10 realizados e checklists atualizados pelo aluno.
- [x] ZIPs de backend e frontend produzidos sem `node_modules` (capturas pendentes deverão ser incorporadas antes do envio final).
- [x] ZIP completo de continuidade preparado.
