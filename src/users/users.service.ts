import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    //crear un usuario
    async createUser(User: CreateUserDto): Promise<User> {
        const saltRounds = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(User.password, saltRounds);
        const newUser = this.usersRepository.create({...User, password: hashedPassword});
        return this.usersRepository.save(newUser);
    }

    //listar todos los usuarios
    async getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    //listar un usuario por id
    async getUserById(id: number) {
        return this.usersRepository.findOne({
            where: { id }
        });
    }

    //eliminar un usuario por id
    async deleteUserById(id: number){
        return this.usersRepository.delete({ id });
    }
}
