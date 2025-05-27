import { Injectable, UnauthorizedException, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userService: Model<User>,
    private jwtService: JwtService,
  ){}

 async singIn(email: string, password: string): Promise<any> {
  const user = await this.userService.findOne({ email })
  if (!user) {
    throw new UnauthorizedException("Email or password incorrect");
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if(isMatch) {
    return await this.generatedToken(user);
  }

  throw new UnauthorizedException("Email or password incorrect")
 }

 async generatedToken(payload: User) {
  return {
    access_token: this.jwtService.sign(
      { email: payload.email },
      {
        secret: 'process.env.JWT'
      }
    )
  }
 }
  

}
