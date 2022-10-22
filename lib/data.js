export const periods = ["Daily","Weekly","Monthly"]

export const calculateUnits = [1,7,0];

export const depositStages = ["In Progress", "Completed", "OverDue"]

export const dateCalculator = async(start, end, frequency) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
    if(frequency === "Daily"){
        return Math.round((endDate - startDate)/(1000*60*60*24))
    }
    if(frequency === "Weekly"){
        return Math.round((endDate - startDate)/(1000*60*60*24*7))
    }
    if(frequency === "Monthly"){
        return(
            endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear())
        )
    }
}

export const dateIncrementor = async(input, frequency) => {
    let inputDate = new Date(input)
    if(frequency === "Daily" ){
        return inputDate.setDate(inputDate.getDate() + 1)
    }
    if(frequency === "Weekly"){
        return inputDate.setDate(inputDate.getDate() + 7)
    }
    if(frequency === "Monthly"){
        return(
            inputDate.setMonth(inputDate.getMonth() + 1)
        )
    }
}

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
        },
    })

    return deposits
}

export const getDepositsOnUser = async(userId, prisma) =>{
    const deposits = await prisma.personalDeposit.findMany({
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

    return deposits
}

export const getCompletedDepositsPerSaving = async(savingId, prisma) => {
    const deposits = await prisma.personalDeposit.findMany({
        where:{
            AND: [
                {saving:{
                    id: Number(savingId)
                }},
                {stage: {
                    contains: "Completed"
                }}
            ]
        },
        select:{
            id: true,
            savingId: true,
            ownerId: true,
            value: true,
            point: true,
        }
    })

    return deposits
}

export const getCompletedDepositsPerUser = async(userId, prisma) => {
    const deposits = await prisma.personalDeposit.findMany({
        where:{
            AND: [
                {owner:{
                    id: userId
                }},
                {stage: {
                    contains: "Completed"
                }}
            ]
        },
        select:{
            id: true,
            savingId: true,
            ownerId: true,
            value: true,
            point: true,
        }
    })
    return deposits
}