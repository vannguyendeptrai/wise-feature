import prisma from 'lib/prisma'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(501).end()
    }

    console.log(req.body)

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
            period: Number(req.body.period),
            deadline: req.body.deadline,
            owner: {
              connect: { id: req.body.userId },
            },
        }

        const saving = await prisma.personalSaving.create({
            data: data,
        })

        res.json(saving)
        return
    }
}