import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  constructor() {}

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find(
      (notification) => notification.id.toString() === id,
    )

    return notification ?? null
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const idx = this.items.findIndex((item) => item.id === notification.id)

    if (idx >= 0) {
      this.items[idx] = notification
    }
  }
}
