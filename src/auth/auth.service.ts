import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto, UserDto, UserReturnDto } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Payload } from './jwt.strategy';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService : JwtService) { }
    
    async validateUser(name: string, password: string): Promise<UserReturnDto>{
        const user  = await this.userService.findOne(name)
        if (user && user.password == password) {
            const { password, ...rest } = user;
            return rest;
        }
        return null;
    }

    // This method ONLY sets the JWT after the normal validation.
    async login(user: User) {
        // TODO: this could promote error
        const payload : Payload = { name: user.username, id: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
