import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

import express, { Request, Response } from 'express'
import { Post } from "./entity/Post";
import {validate } from 'class-validator'

const app=express()
app.use(express.json())


//CREATE USERS
app.post('/users',async(req:Request,res: Response)=>{
    const {name, role, email,pwd}=req.body
    try{
        const user=User.create({name,role,email,pwd})
        const errors=await validate(user)
        if (errors.length>0) throw errors
        await user.save()
        return res.status(201).json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json({err:'Something went wrong in post request'})
    }
})


//CREATE POSTS
app.post('/posts',async(req:Request,res: Response)=>{
    const {userUuid,title,body}=req.body
    try{
        const user= await User.findOneOrFail({uuid:userUuid})
        const post= new Post({title,body,user})
        await post.save()
        return res.status(201).json(post)
    }catch(err){
        console.log(err)
        return res.status(500).json({err:'Something went wrong in post request'})
    }
})



//READ POSTS
app.get('/posts',async(req:Request,res: Response)=>{
   
    try{
       
        const posts= await Post.find({relations:['user']})
       
        return res.status(201).json(posts)
    }catch(err){
        console.log(err)
        return res.status(500).json({err:'Something went wrong in post request'})
    }
})

//READ USERS

app.get('/users',async(_:Request,res: Response)=>{
   
    try{
        const users=await User.find({relations:['posts']})

        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({err:'Something went wrong in get request'})
    }
})

//UPDATE USERS


app.put('/users/:uuid',async (req: Request,res: Response)=>{
    const uuid=req.params.uuid
    const {name, role, email,pwd}=req.body
    try {
            const user= await User.findOneOrFail({uuid}); //finds the user by uuid
           user.name=name||user.name
           user.role=role||user.role
           user.email=email||user.email
           user.pwd=pwd||user.pwd

           await user.save()
           return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Something went wrong in update request'})
    }
})

//DELETE USERS


app.delete('/users/:uuid',async (req: Request,res: Response)=>{
    const uuid=req.params.uuid
    
    try {
            const user= await User.findOneOrFail({uuid}); //finds the user by uuid
           
           await user.remove()
           return res.status(204).json({message: 'User deleted successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Something went wrong in delete request'})
    }
})

//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

//FIND USERS BY ID

app.get('/users/:uuid',async (req: Request,res: Response)=>{
    const uuid=req.params.uuid
    
    try {
            const user= await User.findOneOrFail({uuid}); //finds the user by uuid
           

           return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(404).json({user:'User not found.'})
    }
})




createConnection().then(async() => {

   app.listen(5000,()=>console.log('Server up at http://localhost:5000'))
    
}).catch(error => console.log(error));
