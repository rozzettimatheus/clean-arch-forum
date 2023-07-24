import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions.repository'
import { QuestionCommentCreatedEvent } from '@/domain/forum/enterprise/events/question-comment-created-event'

export class OnQuestionCommentCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewQuestionCommentCreatedNotification.bind(this),
      QuestionCommentCreatedEvent.name,
    )
  }

  private async sendNewQuestionCommentCreatedNotification({
    questionComment,
  }: QuestionCommentCreatedEvent) {
    const question = await this.questionsRepository.findById(
      questionComment.questionId.toString(),
    )

    if (!question) {
      return
    }

    await this.sendNotification.execute({
      recipientId: question.authorId.toString(),
      title: `Novo comentário adicionado à sua pergunta "${question.titleExcerpt}"`,
      content: questionComment.excerpt,
    })
  }
}
