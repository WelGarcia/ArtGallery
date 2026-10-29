# Atividade 10 — Respostas da Seção 1

**1. Por que usar um índice único composto?**  A regra de uma curtida por pessoa e por obra precisa estar no banco. O índice único composto em `user_id` e `artwork_id` impede que o mesmo par seja gravado duas vezes, mesmo se duas requisições chegarem juntas ou alguém inserir uma linha diretamente no banco.

**2. Contador guardado ou calculado?**  O contador guardado (`likesCount` e `commentsCount`) deixa a leitura mais rápida, pois o número já vem junto com a obra. O contador calculado usa `COUNT(*)` para contar os registros na hora. O risco do guardado é ficar diferente do número real, por isso atualizamos a linha da curtida ou comentário e o contador juntos, dentro de uma transação.

**3. O que acontece sem `transaction: t`?**  Se um comando não receber `{ transaction: t }`, ele pode ser executado fora da transação. Assim, quando ocorre um erro e o Sequelize desfaz as operações, esse comando de fora não é revertido, o que pode deixar os dados inconsistentes.

**4. Como funciona a atualização otimista?**  Primeiro guardamos o estado anterior, depois mudamos o coração e o contador imediatamente e, por último, confirmamos o resultado da API ou voltamos ao valor anterior se der erro (rollback). Isso funciona bem para curtidas, mas eu não usaria em pagamentos nem em exclusões definitivas, porque são ações mais delicadas.

**5. Por que usar `{{ }}` em vez de `v-html`?**  O texto de comentários é digitado por outros usuários. Com `{{ }}`, o Vue mostra tags HTML como texto, sem executar código. Já `v-html` pode interpretar o conteúdo como HTML e abrir espaço para ataques XSS.

**6. Por que chamar `.trim()` antes de `.notEmpty()`?**  O `.trim()` remove espaços no começo e no fim da entrada. Se vier primeiro, um texto digitado só com espaços se transforma em vazio e o `.notEmpty()` consegue bloquear o envio. Na ordem contrária, os espaços passam na validação e podem virar um valor vazio depois.
