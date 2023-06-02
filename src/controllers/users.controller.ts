import crypto from 'crypto';
// import User from '../models/user';
import { Request, Response } from 'express';
import { pool as db } from '../../common/database/database'
import { QueryResult } from 'pg';


export const getById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: QueryResult = await db.query('SELECT * FROM users WHERE id = $1', [Number(req.params.userId)]);
        if (user.rowCount > 0) {
            return res.status(200).send(user.rows[0]);
        } else {
            return res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const insert = async (req: Request, res: Response): Promise<Response> => {
    try {
        let { username, password } = req.body;
        console.log(username, password)
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        password = salt + "$" + hash;
        await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
        return res.status(200).send({
            message: 'User created successfully',
            data: {
                username,
                password
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
}
