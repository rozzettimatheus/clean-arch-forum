import { SpyInstance } from 'vitest'

import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { OnQuestionCommentCreated } from './on-question-comment-created'

import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { waitFor } from 'test/utils/wait-for'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository

let sendNotification: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Question Comment Created', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotification = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotification, 'execute')

    new OnQuestionCommentCreated(inMemoryQuestionsRepository, sendNotification)
  })

  it('should send a notification when an answer comment is created', async () => {
    const question = makeQuestion()
    const questionComment = makeQuestionComment({ questionId: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryQuestionCommentsRepository.create(questionComment)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })

    expect(inMemoryNotificationsRepository.items[0]?.recipientId).toEqual(
      question.authorId,
    )
  })
})
