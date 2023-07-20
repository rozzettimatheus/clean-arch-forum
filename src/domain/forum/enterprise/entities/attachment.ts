import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

type AttatchmentProps = {
  title: string
  link: string
}

export class Attachment extends Entity<AttatchmentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttatchmentProps, id?: UniqueEntityId) {
    const attatchment = new Attachment(props, id)

    return attatchment
  }
}
