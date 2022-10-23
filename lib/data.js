export const periods = ["Daily","Weekly","Monthly"]

export const calculateUnits = [1,7,0];

export const depositStages = ["In Progress", "Completed", "OverDue"]

export const couponSets = [
    {
        id: 0,
        title: "30% OFF",
        sponsor: "Wise",
        require: 10,
        description: "On your next transfer",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/58775efdd482e90f8535f34f/1613728331160-Z1PWHRPF8D0S55RSUBEU/primary-blue-white.png",
        isClaimed: false,
    },
    {
        id: 1,
        title: "25% OFF",
        sponsor: "antavo",
        require: 15,
        description: "On your next campain",
        imageUrl: "https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/147299/antavo-black-logo.png",
        isClaimed: false,
    },
    {
        id: 2,
        title: "Free 3 months",
        sponsor: "Seon",
        require: 20,
        description: "On Personal plan",
        imageUrl: "https://resources.cdn.seon.io/assets/logos/seon-logo-schema.png",
        isClaimed: false,
    },
    {
        id: 3,
        title: "Free 2 Coffee",
        sponsor: "Starbucks",
        require: 5,
        description: "From special menu",
        imageUrl: "https://1000logos.net/wp-content/uploads/2016/12/Starbucks-Logo.png",
        isClaimed: false,
    },
]

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

export const calculateSavingsOfUser = async(userId, prisma) => {
    let savings = await prisma.personalSaving.findMany({
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

    for(var i = 0; i < savings.length; i++){
        let deposits = await prisma.personalDeposit.findMany({
            where:{
                AND: [
                    {saving:{
                        id: Number(savings[i].id)
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
        });

        let sumPointPerSaving = 0;
        let sumDepPerSaving = 0;

        deposits.forEach((deposit)=>{
            sumPointPerSaving += deposit.point
            sumDepPerSaving += deposit.value
        })

        await prisma.personalSaving.update({
            where:{
                id: Number(savings[i].id)                
            },
            data: {
                currentPoint: sumPointPerSaving,
                currentDeposit: sumDepPerSaving
            }
        })
    }

    savings = await prisma.personalSaving.findMany({
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
    });

    let userCurrentPoint = 0

    savings.forEach((saving) => {
        userCurrentPoint += saving.currentPoint
    })

    await prisma.user.update({
        where:{
            id: userId
        },
        data: {
            currentPoint: userCurrentPoint
        }
    })

    return savings;
}