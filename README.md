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
