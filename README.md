# Forum API

- Built using the clean architecture principles

## DDD - Agreggate Root

- entidade principal

  - nao precisa criar repositorio para os agregados
  - o agreggate_root (repository) deve lidar tambem em salvar no banco as entidades agregadas

- Concept
- conjunto de entidades manipuladas ao AO MESMO TEMPO!
  - diferente de question e question-comment

## WatchedList (pattern)

- array de "historico" - caso algo foi deletado/atualizado/criado

- Question -> Attatchment[] (aggregate)
  agregado = conjunto
- edicao (watched lists)

### criacao

- Titulo pergunta
- COnteudo
- anexos (3)

## edicao

- Titulo
- Conteudo

(+ complicado)

- Anexos
  - add novo anexo (create)
  - remover segundo anexo criado previamente (delete)
  - editar um anexo existente (update)

## subdominios

- Core: o que da/envolve dinheiro (ecommerce - compra, catalogo, pagamento, faturamento) - NAO PODE PARAR DE JEITO NENHUM
- Supporting: da suporte para o Core funcionar (estoque)
- Generic: voce precisa mas nao sao essenciais (notificacao ao cliente, promocoes, chat)

- DDD desconectar da parte tecnica / dividir por setores

- ajuda a enxergar - microsservicos (independencia!! entre os subdominios)
