import prisma from "lib/prisma";
import { getCompletedDepositsPerUser, getCompletedDepositsPerSaving, getUser, getSavingsFromUser } from 'lib/data'

export default async function handler(req, res){    
    if (req.method !== 'GET') return res.end()

    const user = await getUser(req.header.userId);
    
    if (!user) return res.status(401).json({ message: 'User not found' })

    if(req.body.task === "calculate_saving_of_user"){
        const savings = await getSavingsFromUser(user.id);
    
        for(var i = 0; i < savings.length; i++){
            let deposits = await getCompletedDepositsPerSaving(savings[i].id);
            let sumPointPerSaving = 0;
            let sumDepPerSaving = 0;

            await deposits.forEach((deposit)=>{
                sumPointPerSaving += deposit.point
                sumDepPerSaving += deposit.value
            })

            await prisma.personalSaving.update({
                where:{
                    saving:{
                        id: Number(savings[i].id)
                    }
                },
                data: {
                    currentPoint: sumPointPerSaving,
                    currentDeposit: sumDepPerSaving
                }
            })
        }
    }

    if(req.header.task === "calculate_point_of_user"){
        const deposits = await getCompletedDepositsPerUser(user.id)
        let sumPoint = 0;
        await deposits.forEach((deposit) => {
            sumPoint += deposit.point
        })
        await prisma.user.update({
            where:{
                user:{
                    id: user.id
                }
            },
            data: {
                currentPoint: sumPoint
            }
        })
    }

    res.end()
}