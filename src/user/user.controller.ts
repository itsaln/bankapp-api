import { Body, Controller, Get, HttpCode, Param, Patch, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { UserService } from '@app/user/user.service'
import { CurrentUser } from '@app/user/user.decorator'
import { UserDto } from '@app/user/user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	findAll() {
		return this.userService.findAll()
	}

	@Get('profile')
	@Auth()
	findOne(@CurrentUser('id') id: number) {
		return this.userService.findOne(id)
	}

	@Get('by-id/:id')
	getUser(@Param('id') id: string) {
		return this.userService.findOne(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	update(@Param('id') id: string, @Body() dto: UserDto) {
		return this.userService.update(+id, dto)
	}

	@HttpCode(200)
	@Patch('toggle-contact/:contactId')
	toggleContact() {

	}
}
