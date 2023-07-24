import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  private aggregate: CustomAggregate // eslint-disable-line
  public ocurredAt: Date

  // pode inclui qualquer info no constructor
  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // subscriber cadastrado (ouvindo o evento de "resposta criada")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Criando uma resposta sem salvar no banco
    const aggregate = CustomAggregate.create()

    // Assegurando que o evento foi criado mas NAO disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Salvando a resposta no banco de dados e DISPARANDO o evento
    // simular o banco de dados rodar o metodo dispatch apos concluido com sucesso
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber ouve o evento e faz o necessario com as informacoes
    expect(callbackSpy).toHaveBeenCalled()

    // Removeu todos os eventos ja chamados
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
