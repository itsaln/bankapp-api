import { IsEmail, IsString } from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string

	password?: string

	@IsString()
	name: string

	@IsString()
	address: string

	@IsString()
	avatarPath: string
}
