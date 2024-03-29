import { Comment, CommentProps } from './comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Optional } from '@/core/types/optional'
import { QuestionCommentCreatedEvent } from '../events/question-comment-created-event'

export type QuestionCommentProps = CommentProps & {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNew = !id

    if (isNew) {
      questionComment.addDomainEvent(
        new QuestionCommentCreatedEvent(questionComment),
      )
    }

    return questionComment
  }
}
