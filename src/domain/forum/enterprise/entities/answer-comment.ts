import { Comment, CommentProps } from './comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Optional } from '@/core/types/optional'
import { AnswerCommentCreatedEvent } from '../events/answer-comment-created-event'

export type AnswerCommentProps = CommentProps & {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNew = !id

    if (isNew) {
      answerComment.addDomainEvent(new AnswerCommentCreatedEvent(answerComment))
    }

    return answerComment
  }
}
