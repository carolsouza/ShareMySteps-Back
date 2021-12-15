import { Router, Request, Response } from "express";
import { User } from "../entity/User";

import { getRepository } from "typeorm";


export const getUsers = async (request: Request, response: Response) => {

    
}

export const getUser = async (request: Request, response: Response) => {

    const {id} = request.params;

    const usuario = await getRepository(User).findOne(id);

    return response.json
}