import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

import express, { Request, Response } from 'express'


const app=express()
app.use(express.json())


//CREATE USERS
app.post('/users',async(req:Request,res: Response)=>{
    const {name, role, email}=req.body
    try{
        const user=User.create({name,role,email})
        await user.save()
        return res.status(201).json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})


//READ

app.get('/users',async(_:Request,res: Response)=>{
   
    try{
        const users=await User.find()

        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

//UPDATE
//DELETE
//FIND

createConnection().then(async() => {

   app.listen(5000,()=>console.log('Server up at http://localhost:5000'))
    
}).catch(error => console.log(error));
