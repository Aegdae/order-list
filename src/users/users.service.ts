import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserType } from './entities/user.entity';
import { Address } from './entities/address.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userSchema: Model<User>,
    @InjectModel(Address.name) private addressSchema: Model<Address>
  ) {}

  async create(createUserDto: CreateUserDto) {

    const hased_password = await bcrypt.hash(createUserDto.password, 12);

    const address = await this.addressSchema.create(createUserDto.address)

    const user = await this.userSchema.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hased_password,
      address: address._id,
      userType: UserType.USER
    });

    return user;
  }

  findAll() {
    return this.userSchema.find().populate('address');
  }

  findOne(id: string) {
    return this.userSchema.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userSchema.updateOne(updateUserDto);
  }

  //remove(id: string) {
    //return this.userSchema.deleteOne(id);
  //}
}