import { Request, Response } from 'express';
import knex from '../database/connection';
import { v4 } from 'uuid';

class UsersControllers {
    async index(request: Request, response: Response) {
        const user = await knex('users').select('*');
        return user;
    }

    async create(request: Request, response: Response) {
        const id = v4();
        const { email, name, password, photo } = request.body;
        const user = { id, email, name, password, photo };
        try {
            await knex('users').insert(user);
            response.status(204);
            return response.json(user);
        } catch (error) {
            console.log(error);
            return response.status(400)
        }
    }
    async auth(request: Request, response: Response) {
        const { email, password } = request.body;
        if (email && password) {
            const user = await knex('users').where({
                'email': email,
                'password': password
            }).first();
            if (user) {
                response.status(200);
                return response.json(user.id);
            }
            else {
                response.status(404);
                return response.send("user not found");
            }
        }
        else {
            response.status(400);
            return response.send("invalid values");
        }
    }

    // async auth(email: string, password: string) {
    //     const user = await knex('users').where({
    //         'email': email,
    //         'password': password
    //     }).first();
    //     if (user)
    //         return user;
    //     return null;
    // }
}

export default UsersControllers;