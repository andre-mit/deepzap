import { Request, Response } from 'express';
import knex from '../database/connection';

class MessagesController {
    async index(request: Request, response: Response) {
        const user = await knex('users').select('*');
        return user;
    }

    async create(request: Request, response: Response) {

    }
}

export default MessagesController;