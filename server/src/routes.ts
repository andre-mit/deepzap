import express, { Request, Response } from 'express';
import knex from './database/connection';

import { User } from './models';

import UsersController from './controllers/UsersController';

const usersController = new UsersController;

const routes = express.Router();

routes.get('/users', (require, response) => {

});

routes.post('/users/register', usersController.create);

 routes.post('/users/login', usersController.auth);

export default routes;