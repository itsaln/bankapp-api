import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from '@app/utils/base'

@Entity('User')
export class UserEntity extends Base {
	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column({ default: '' })
	name: string

	@Column({ default: '/uploads/default-avatar.png', name: 'avatar_path' })
	avatarPath: string

	@Column({ default: '', type: 'text' })
	address: string

	@OneToMany(() => UserEntity, user => user.id, { cascade: true })
	contacts: UserEntity[]
}
