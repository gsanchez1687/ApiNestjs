import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { exit } from 'process';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}

    //crear un usuario
    async createUser(User: CreateUserDto): Promise<Users> {

      
        
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
    async getUsers(): Promise<Users[]> {

        try {
            const users = this.usersRepository.find();
            if(users){
                return users;
            }else{
                throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
        }

    }

    //listar un usuario por id
    async getUserById(id: number) {

        try {
            const user = await this.usersRepository.findOne({
                where: { id }
            });
            if(user){
                return user;
            }else{
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

        } catch (error) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    //eliminar un usuario por id
    async deleteUserById(id: number){
        try {
            const deleteUser =  await this.usersRepository.delete({ id });
            if(deleteUser){
                return deleteUser;
            }else{
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
        }catch (error) {
            throw new HttpException('User not can not delete', HttpStatus.NOT_FOUND);
        }
    }

    //actualizar un usuario
    async updateUserById(id: number, User: UpdateUserDto) {

        try {
            const user = await this.usersRepository.findOne({
                where: { id }
            });
            if(!user){
                throw new HttpException('User not found', HttpStatus.NOT_MODIFIED);
            }else{
                if(User.password){
                    const saltRounds = bcrypt.genSaltSync(10);
                    const hashedPassword = await bcrypt.hash(User.password, saltRounds);
                    return await this.usersRepository.update({ id }, {...User, password: hashedPassword});
                }else{
                    return await this.usersRepository.update({ id },User);
                }
            }
        } catch (error) {
            throw new HttpException('Error update', HttpStatus.NOT_MODIFIED);
        }
    }
}
