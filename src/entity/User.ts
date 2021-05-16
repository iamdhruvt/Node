import { IsEmail, IsEnum, Length } from "class-validator";
import {Entity, Column, OneToMany} from "typeorm";


import Model from './Model'
import { Post } from "./Post";

@Entity("users")
export class User extends Model {

    @Column()
    @Length(1,255)
    name: string;

    @Column({
        type:'enum',
        enum:['Employee','Manager','IT','Customer Relations','Team Lead','CEO','HR','Junior Software Programmer',undefined],
        default:'Employee'
    })
    @IsEnum(['Employee','Manager','IT','Customer Relations','Team Lead','CEO','HR','Junior Software Programmer',undefined])
    role: string;

    @Column()
    @Length(1,255)
    @IsEmail()
    email: string;

    @Column()
    @Length(5,255)
    pwd: string;

    @OneToMany(()=>Post,post=>post.user)
    posts: Post[]
    
}
