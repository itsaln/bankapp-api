import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from '@app/utils/base'

@Entity('Contacts')
export class ContactsEntity extends Base {
	@OneToMany(() => UserEntity, user => user.id, { cascade: true })
	contacts: UserEntity[]
}
