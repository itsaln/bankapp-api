import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from '@app/user/user.service'
import { UserController } from '@app/user/user.controller'
import { UserEntity } from '@app/user/user.entity'

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UserModule {}
