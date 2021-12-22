import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserCreateDto, UserReturnDto } from './user.dto';
import { UserService } from './user.service';

  @UseInterceptors(ClassSerializerInterceptor)
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService, private readonly authService : AuthService) {}

    // Make route protected
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(): Promise<UserReturnDto[]> {
      return this.userService.getAllUsers();
    }

    @Post()
    createUser(@Body() user: UserCreateDto): Promise<UserReturnDto> {
      return this.userService.createUser(user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async userLogin(@Request() req) {
      return this.authService.login(req.user);
    }
      
    @Get('/:id')
    getOneUserById(@Param('id') id: number): Promise<UserReturnDto>{
        return this.userService.getOneUserById(id);
    }

  }
