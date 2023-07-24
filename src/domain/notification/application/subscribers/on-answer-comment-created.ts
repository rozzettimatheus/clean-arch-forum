import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers.repository'
import { AnswerCommentCreatedEvent } from '@/domain/forum/enterprise/events/answer-comment-created-event'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions.repository'

export class OnAnswerCommentCreated implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerCommentCreated.bind(this),
      AnswerCommentCreatedEvent.name,
    )
  }

  private async sendNewAnswerCommentCreated({
    answerComment,
  }: AnswerCommentCreatedEvent) {
    const answer = await this.answersRepository.findById(
      answerComment.answerId.toString(),
    )

    if (!answer) {
      return
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return
    }

    await this.sendNotification.execute({
      recipientId: answer.authorId.toString(),
      title: `Novo comentário adicionado à sua resposta na pergunta "${question.titleExcerpt}"`,
      content: answerComment.excerpt,
    })
  }
}
