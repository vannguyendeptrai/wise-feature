import prisma from "lib/prisma"
import { faker } from '@faker-js/faker'
import { periods, calculateUnits, depositStages } from "lib/data"

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

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
  
        users.forEach(async (user) => {
            let count = 0
            var index = getRandomInt(0,2);
            var data = {
                title: faker.word.noun().toLowerCase(),
                content: faker.lorem.paragraph(1).toLowerCase(),
                savingGoal: faker.datatype.number(100,200),
                period: periods[index],
                calculateUnit: calculateUnits[index],
                deadline: faker.date.future(),
                owner: {
                    connect: { id: user.id },
                },
            }
            while (count < 2) {
                await prisma.personalSaving.create({
                    data: data,
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
                        stage: depositStages[0]
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