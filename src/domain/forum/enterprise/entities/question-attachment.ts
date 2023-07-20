import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export type QuestionAttachmentProps = {
  questionId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityId) {
    const questionAttatchment = new QuestionAttachment(props, id)

    return questionAttatchment
  }
}
