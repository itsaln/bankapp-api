import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { hash } from 'bcryptjs'
import { UserEntity } from '@app/user/user.entity'
import { UserDto } from '@app/user/user.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async findAll() {
		return await this.userRepository.find()
	}

	async findOne(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: { contacts: true },
			order: { createdAt: 'DESC' }
		})

		if (!user) throw new NotFoundException('Пользаватель не найден!')

		return user
	}

	async update(id: number, dto: UserDto) {
		const user = await this.findOne(id)

		const isSameUser = await this.userRepository.findOneBy({ email: dto.email })

		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email занят')

		if (dto.password) user.password = await hash(dto.password)

		user.email = dto.email
		user.name = dto.name
		user.address = dto.address
		user.avatarPath = dto.avatarPath

		return this.userRepository.save(user)
	}

	async toggleContact(currentUserId: number, contactId: number) {
		const currentUser = await this.findOne(currentUserId)
		const contact = await this.findOne(contactId)

		let userContactsId = currentUser.contacts.map(contact => contact.id)
		let contactContactsId = contact.contacts.map(contact => contact.id)

		if (userContactsId.includes(contact.id)) {
			userContactsId = userContactsId.filter(
				id => String(id) !== String(contactId)
			)
			contactContactsId = contactContactsId.filter(
				id => String(id) !== String(currentUserId)
			)
		} else {
			userContactsId = [...userContactsId, contactId]
			contactContactsId = [...contactContactsId, currentUserId]
		}

		currentUser.contacts = userContactsId.map(id => ({ id } as UserEntity))
		contact.contacts = contactContactsId.map(id => ({ id } as UserEntity))

		await this.userRepository.save([currentUser, contact])

		return true
	}
}
