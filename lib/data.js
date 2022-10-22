export const periods = ["Daily","Weekly","Monthly"]

export const getUser = async(id, prisma) => {
    const user = await prisma.user.findUnique({
        where:{
            id,
        }
    })
    return user
}

export const getUsers = async(prisma) => {
    const users = await prisma.user.findMany()
    return users
}

export const getSavingsFromUser = async (userId, prisma) =>{
    const savings = await prisma.personalSaving.findMany({
        where:{
            owner:{
                id: userId
            }
        },
        orderBy:[
            {
                id: 'desc',
            }
        ],
        include:{
            owner: true
        }
    })

    return savings
}

export const getSaving = async(id, prisma) => {
    const saving = await prisma.personalSaving.findUnique({
        where:{
            id: Number(id),
        }
    })
    return saving
}

export const getDepositsOnSaving = async(savingId, prisma) =>{
    const deposits = await prisma.personalDeposit.findMany({
        where:{
            saving:{
                id: Number(savingId)
            }
        },
        orderBy:[
            {
                id: 'desc',
            }
        ],
        include:{
            owner: true
        }
    })

    return deposits
}