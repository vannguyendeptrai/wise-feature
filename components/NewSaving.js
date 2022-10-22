import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import { periods, calculateUnits } from 'lib/data'


export default function NewSaving({ user }){
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [savingGoal, setSavingGoal] = useState('')
    const [deadline, setDeadline] = useState('')
    const [period, setPeriod] = useState(periods[0])
    
    return (
        <>            
            <div className='flex flex-row mb-4  px-10 justify-center'>
            <div className='flex flex-col mb-4 border border-3 border-black p-10 bg-gray-200 my-10'>
                <form
                        className='flex flex-col '
                        onSubmit={async (e) => {
                        e.preventDefault()
                        if (!title) {
                            alert('Enter a title')
                            return
                        }
                        var unit = calculateUnits[0]
                        switch(period){
                            case "Daily": unit = calculateUnits[0];
                            case "Weekly": unit = calculateUnits[1];
                            case "Monthly": unit = calculateUnits[2];
                        }

                        const reqBodyObj = {
                            'title': title,
                            'content': content,
                            'savingGoal': savingGoal,
                            'period': period,
                            'unit': unit,
                            'deadline': deadline,
                            'userId': user.id,
                        }

                        const res = await fetch('/api/saving', {
                            headers : {'Content-Type' : 'application/json'},
                            body: JSON.stringify(reqBodyObj),
                            method: 'POST',
                        })

                        router.push(`/user/${user.id}`)
                    }}
                >
                    <h2 className='text-2xl font-bold mb-8'>Create New Saving Plan</h2>
                    <input
                    className='border border-gray-700 border-b-0 p-4 w-full text-lg font-medium bg-transparent outline-none  '
                    rows={1}
                    cols={50}
                    placeholder='The saving title'
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                    className='border border-gray-700 p-4 w-full text-lg font-medium bg-transparent outline-none  '
                    rows={5}
                    cols={50}
                    placeholder='The saving content'
                    onChange={(e) => setContent(e.target.value)}
                    />
                    <input
                    className='border border-gray-700 border-b-0 p-4 w-full text-lg font-medium bg-transparent outline-none  '
                    rows={1}
                    cols={50}
                    placeholder='The saving goal'
                    onChange={(e) => setSavingGoal(e.target.value)}
                    />
                    <input
                    className='border border-gray-700 border-b-0 p-4 w-full text-lg font-medium bg-transparent outline-none  '
                    rows={1}
                    cols={50}
                    placeholder='The saving deadline'
                    onChange={(e) => setDeadline(e.target.value)}
                    />
                    <input
                    className='border border-gray-700 border-b-0 p-4 w-full text-lg font-medium bg-transparent outline-none  '
                    rows={1}
                    cols={50}
                    placeholder='The saving period'
                    onChange={(e) => {
                        setPeriod(e.target.value)
                    }}
                    />
                    <div className='mt-5'>
                    <button className='border border-gray-700 px-8 py-2 mt-0 mr-8 font-bold '>
                        Save
                    </button>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}