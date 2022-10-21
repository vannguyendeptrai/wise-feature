import prisma from "lib/prisma"
import { faker } from '@faker-js/faker'

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.end()
  
    if (req.body.task === 'generate_users') {
        let count = 0

        while (count < 5) {
            await prisma.user.create({
                data: {
                    name: faker.internet.userName().toLowerCase(),
                    email: faker.internet.email().toLowerCase(),                    
                },
            })
            count++
        }
    }
 
    if (req.body.task === 'add_fake_personal_content') {
        const users = await prisma.user.findMany()
    
        const getRandomUser = () => {
            const randomIndex = Math.floor(Math.random() * users.length)
            return users[randomIndex]
        }

        const createSavingForRandomUser = async () => {
            const user = getRandomUser()

            let count = 0
        
            while (count < 5) {
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
        }
        await createSavingForRandomUser()

        const personalSavings = await prisma.personalSaving.findMany()

        personalSavings.forEach(async (saving) => {
            let count = 0
            const depositNumber = Math.floor(Math.random() * 5)
        
            while (count < depositNumber) {
            
                await prisma.personalDeposit.create({
                    data: {
                        value: faker.datatype.number(20,50),
                        saving: {
                            connect: { id: saving.id },
                        },
                        owner: {
                            connect: { id: saving.ownerId },
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