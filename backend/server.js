import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
}))

app.post('/usuario', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuario', async (req, res) => {

    let users = []
    if(req.query){
        users = await prisma.user.findMany({
            where:{
                email: req.query.email,
                name: req.query.name,
                age: req.query.age

            }
        })
    }else{
        users = await prisma.user.findMany()
    }


    res.status(200).json(users)

})

app.put('/usuario/:id', async (req, res) => {


    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuario/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Usuário deletado com sucesso!"})
})

app.listen(3000)