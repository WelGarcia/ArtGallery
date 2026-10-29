# Guia de Entrega — Aula 03 — ArtGallery

## 1. Antes de executar

Na API, abra o arquivo `.env` e substitua:

`DB_PASSWORD=coloque_aqui_a_senha_do_seu_mysql`

pela senha real do seu MySQL.

O projeto foi preparado para usar:

- Banco: `artgallery_db`
- API: `http://localhost:3000`
- Frontend: `http://localhost:5173`
- Campo de contagem do ArtGallery: `artworksCount`

## 2. Criar o banco

No MySQL Workbench/DBeaver, execute:

```sql
CREATE DATABASE artgallery_db;
```

Não é necessário criar a tabela `users` manualmente. O Sequelize fará isso ao iniciar a API.

## 3. Instalar dependências da API

No terminal:

```bat
cd art-gallery-api
npm install
npm run dev
```

Confirme a mensagem:

`Banco de dados sincronizado!`

Depois abra o banco `artgallery_db`, confirme a tabela `users` e tire o print `tabela-users.jpg`.

## 4. Testar a API

No Windows CMD, use os comandos em uma linha.

### Cadastro com sucesso

```bat
curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d "{\"username\":\"teste123\",\"email\":\"teste@email.com\",\"password\":\"123456\",\"confirmPassword\":\"123456\",\"fullName\":\"Usuario de Teste\"}"
```

Esperado: status `201`. Tire o print `curl-cadastro-sucesso.jpg`.

### Erro de validação

```bat
curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d "{\"username\":\"pedro\",\"email\":\"pedro@email.com\",\"password\":\"123\",\"confirmPassword\":\"123\",\"fullName\":\"Pedro Souza\"}"
```

Esperado: status `400`. Tire o print `curl-erro-validacao.jpg`.

### Erro de duplicidade

Repita o primeiro comando de cadastro. Esperado pelo roteiro: status `500`. Tire o print `curl-erro-duplicidade.jpg`.

### Perfil público

```bat
curl http://localhost:3000/api/profile/teste123
```

Tire o print `curl-profile.jpg`.

## 5. Testar o frontend

Em outro terminal:

```bat
cd art-gallery-frontend
npm install
npm run dev
```

Abra `http://localhost:5173/register`.

1. Envie o formulário vazio e tire `registro-erros.jpg` mostrando as mensagens.
2. Faça um cadastro válido e confirme que a aplicação redireciona para `/login`.
3. Volte ao cadastro e repita o mesmo usuário/e-mail.
4. Abra `F12 > Network`, selecione a requisição `register` com status `500` e tire `registro-duplicidade-network.jpg`.

## 6. Onde colocar os prints

Coloque todos estes arquivos em:

`art-gallery-frontend/01 - Docs/atividade03/`

Arquivos esperados:

- `Ficha-do-Projeto.md` — já incluído.
- `tabela-users.jpg`
- `curl-cadastro-sucesso.jpg`
- `curl-erro-validacao.jpg`
- `curl-erro-duplicidade.jpg`
- `curl-profile.jpg`
- `registro-erros.jpg`
- `registro-duplicidade-network.jpg`

Depois dos testes, marque em `01 - Docs/checklists.md` somente os itens que você realmente confirmou localmente.

## 7. Arquivos para enviar

A atividade pede dois ZIPs sem `node_modules`:

- `WelingtonGarcia-ArtGallery-backend.zip`
- `WelingtonGarcia-ArtGallery-frontend.zip`

Os ZIPs fornecidos junto deste guia já estão sem `node_modules`. Como os prints dependem do seu MySQL e do seu navegador, faça os testes acima, adicione as imagens na pasta `atividade03` e compacte novamente o frontend antes da entrega final ao professor.
