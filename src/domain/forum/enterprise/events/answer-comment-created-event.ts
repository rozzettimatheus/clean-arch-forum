import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { AnswerComment } from '../entities/answer-comment'

export class AnswerCommentCreatedEvent implements DomainEvent {
  public answerComment: AnswerComment
  public ocurredAt: Date

  constructor(answerComment: AnswerComment) {
    this.answerComment = answerComment
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.answerComment.id
  }
}
