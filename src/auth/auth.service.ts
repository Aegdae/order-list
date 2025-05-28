import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import * as bcrypt from 'bcrypt'
import { firstValueFrom } from 'rxjs';
import { JwtPayloadDto } from './dto/jwtpayload.dto';


@Injectable()
export class AuthService {

  constructor(
    private readonly httpService: HttpService,
    private jwtService: JwtService,
  ){}

  async singIn(email: string, password: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/users/${email}`)
   );

  const user = response.data;
    if (!user) {
      throw new UnauthorizedException("Email or password incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch) {
      return await this.generatedToken(user);
    }

    throw new UnauthorizedException("Email or password incorrect")
  }

  
  async generatedToken(payload: JwtPayloadDto) {
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
