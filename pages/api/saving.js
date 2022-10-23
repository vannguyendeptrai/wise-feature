import prisma from 'lib/prisma'
import { dateCalculator, dateIncrementor, depositStages } from 'lib/data'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(501).end()
    }

    const user = await prisma.user.findUnique({
        where: {
            id: req.body.userId
        },
    })

    if (!user) return res.status(401).json({ message: 'User not found' })

    if (req.method === 'POST') {
        const data = {
            title: req.body.title,
            content: req.body.content,
            savingGoal: Number(req.body.savingGoal),
            period: req.body.period,
            calculateUnit: req.body.unit,
            deadline: req.body.deadline,
            owner: {
              connect: { id: req.body.userId },
            },
        }

        const saving = await prisma.personalSaving.create({
            data: data,
        })

        let numberOfDeposits = await dateCalculator(saving.createdAt, saving.deadline, saving.period)
        let depositPerValue = saving.savingGoal / numberOfDeposits
        let nextTargetDate = await dateIncrementor(saving.createdAt, saving.period)
        
        let count = 0
        while(count < numberOfDeposits){

            await prisma.personalDeposit.create({
                data: {
                    value: parseInt(depositPerValue),
                    owner:{
                        connect: {id: saving.ownerId}
                    },
                    saving:{
                        connect: {id: saving.id}
                    },
                    stage: depositStages[0],
                    targetDate: new Date(nextTargetDate)
                }
            })
            nextTargetDate = await dateIncrementor(nextTargetDate, saving.period, saving.unit)
            count++
        }

        res.json(saving)
        return
    }
}