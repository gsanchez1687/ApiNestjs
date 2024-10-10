import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { exit } from 'process';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    //crear un usuario
    async createUser(User: CreateUserDto): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({
                where: [
                    { email: User.email },
                    { username: User.username }
                ]
            });
            if (user) {
                throw new HttpException('User already exists', HttpStatus.CONFLICT);
            }else{
                const saltRounds = bcrypt.genSaltSync(10);
                const hashedPassword = await bcrypt.hash(User.password, saltRounds);
                const newUser = this.usersRepository.create({...User, password: hashedPassword});
                return this.usersRepository.save(newUser);
            }
        }
        catch (error) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
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

    //actualizar un usuario
    async updateUserById(id: number, User: UpdateUserDto) {
        if(User.password){
            const saltRounds = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(User.password, saltRounds);
            return this.usersRepository.update({ id }, {...User, password: hashedPassword});
        }else{
            return this.usersRepository.update({ id },User);
        }

    }
}
