import { UniqueEntityId } from '../entities/unique-entity-id'

// subscription
export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityId
}
