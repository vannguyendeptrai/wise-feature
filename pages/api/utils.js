import prisma from "lib/prisma"
import { faker } from '@faker-js/faker'

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.end()
  
    if (req.body.task === 'generate_users') {
        let count = 0

        while (count < 3) {
            await prisma.user.create({
                data: {
                    name: faker.internet.userName().toLowerCase(),
                    email: faker.internet.email().toLowerCase(),                    
                },
            })
            count++
        }
    }
 
    if (req.body.task === 'add_fake_personal_savings') {
        const users = await prisma.user.findMany()
    
        users.forEach(async (user) => {
            let count = 0
            while (count < 2) {
                await prisma.personalSaving.create({
                    data: {
                        title: faker.word.noun().toLowerCase(),
                        content: faker.lorem.paragraph(1).toLowerCase(),
                        savingGoal: faker.datatype.number(100,200),
                        period: faker.datatype.number(1,30),
                        deadline: faker.date.future(),
                        owner: {
                            connect: { id: user.id },
                        },
                    },
                })
                count++
            }
        })
    }

    if (req.body.task === 'add_fake_personal_deposits') {
        const savings = await prisma.personalSaving.findMany()
    
        savings.forEach(async (saving) => {
            let count = 0
            while (count < 2) {
                await prisma.personalDeposit.create({
                    data: {
                        value: faker.datatype.number(10,20),
                        owner: {
                            connect: { id: saving.ownerId },
                        },
                        saving: {
                            connect: { id: saving.id },
                        },
                    },
                })
                count++
            }
        })
    }
  
    if (req.body.task === 'clean_database') {
        await prisma.personalDeposit.deleteMany({})
        await prisma.personalSaving.deleteMany({})
        await prisma.user.deleteMany({})
    }
  
    res.end()
}