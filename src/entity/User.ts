import {Entity, Column, OneToMany} from "typeorm";

import {v4 as uuid} from 'uuid'

import Model from './Model'
import { Post } from "./Post";

@Entity("users")
export class User extends Model {

    @Column()
    name: string;

    @Column()
    role: string;

    @Column()
    email: string;

    @OneToMany(()=>Post,post=>post.user)
    posts: Post[]
    
}
