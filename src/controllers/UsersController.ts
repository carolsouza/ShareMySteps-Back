import { getRepository, Between } from 'typeorm';
import { Users } from '../entity/Users';
import { Request, Response } from 'express';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


export const getUsers = async (request: Request, response: Response) => {
    response.json({
        message: 'testando'
    });
    console.log('ok')
    //const Users = await getRepository(Users).find();    
    // return response.send({id: request.params.id});
}


export const getUser = async (request: Request, response: Response) => {
    const { id } = request.params

    const user = await getRepository(Users).findOne(id);    
    return response.json(user);
}


export const saveUser = async (request: Request, response: Response) => {
    // console.log(request.body)
    const hashPassword = await bcrypt.hash(request.body.pass, 10);
    const users = new Users();
    users.name = request.body.nome;
    users.password = hashPassword;

    const user = await getRepository(Users).save(users);    
    response.json(user);
}

export const updateUser = async(request: Request, response: Response) => {
    const { id } = request.params

    const hashPassword = await bcrypt.hash(request.body.senha, 10);
    const users = new Users();
    users.name = request.body.nome;
    users.password = hashPassword;

    const user = await getRepository(Users).update(id, users);

    if(user.affected == 1){
        const userUpdated = await getRepository(Users).findOne(id)
        return response.json(userUpdated)
    }

    return response.status(404).json({message: 'Usuário não encontrado'})
}

export const removeUser = async(request: Request, response: Response) => {
    const { id } = request.params

    const user = await getRepository(Users).delete(id);

    if(user.affected == 1){
        const userUpdated = await getRepository(Users).findOne(id)
        return response.json({message: 'Usuário removido'})
    }

    return response.status(404).json({message: 'Usuário não encontrado'})
}

export const verificaLogin = async(request: Request, response: Response) => {
    /*
    const users = await getRepository(Users).findOne({
        where: {
            user: request.body.user
        }
    })
    */

    if (request.body.data) {

        
        const values = request.body.data.values;
        const users = await getRepository(Users).findOne({
            where: {
                email: values.email
            }
        })  
        
        if(users == null){
            return response.status(400).send('Nenhum usuário encontrado!')
        }
    
        const isValid = await bcrypt.compare(values.senha, users.password)
    
        if(!isValid){
            return response.sendStatus(401)
        }
    
        const token = jwt.sign({id: users.id}, 'secret', {expiresIn: '2d'})
    
        delete users.password;
    
        return response.json({
            users,
            token
        })

    } else {
        response.status(400).json({message: 'Requisicao Inválida!'})
    }

}