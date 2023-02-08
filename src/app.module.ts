import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { AuthModule } from '@app/auth/auth.module'
import { UserModule } from '@app/user/user.module'

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig
		}),
		AuthModule,
		UserModule
	]
})
export class AppModule {}
