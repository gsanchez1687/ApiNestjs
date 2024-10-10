import { Controller, Post, Get, Delete, Patch, Param, ParseIntPipe, Body, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { get } from 'http';

@Controller('users')
export class UsersController {
    private logger = new Logger(UsersController.name);
    constructor(private usersService: UsersService) {}


    //crear usuario
    @Post()
    createUser(@Body() newUser: CreateUserDto) {
        this.logger.log(`Creating a new user: ${JSON.stringify(newUser)}`);
       return this.usersService.createUser(newUser);
    }

    //listar todos los usuarios
    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    //listar un usuario
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id:number ) {
        console.log('id', id);
        console.log('id', typeof id);
        return this.usersService.getUserById(id);
    }

    //eliminar un usuario
    @Delete(':id')
    deleteUserById(@Param('id', ParseIntPipe) id:number ) {
        console.log('id', id);
        console.log('id', typeof id);
        return this.usersService.deleteUserById(id);
    }

    //actualizar un usuario
    @Patch(':id')
    updateUserById(@Param('id', ParseIntPipe) id:number, @Body() updateUser: CreateUserDto) {
        return this.usersService.updateUserById(id, updateUser);
    }
}
