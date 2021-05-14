import {Entity, Column} from "typeorm";

import {v4 as uuid} from 'uuid'

import Model from './Model'

@Entity("users")
export class User extends Model {

    @Column()
    name: string;

    @Column()
    role: string;

    @Column()
    email: string;

    
}
