import Link from 'next/link'
import { couponSets } from 'lib/data'

import Coupon from 'components/Coupon'

export default function CouponDisplay(){
    const sets = couponSets
    return(
        <>
            <header className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
                <Link href={`/`}>
                    <a className='underline'>Home</a>
                </Link>
                <p className='grow'></p>
            </header>
            <div className="flex items-center">
                {sets.map((element, key) => (
                    <>
                        <>
                            <Coupon input ={element} key={key}/>
                        </>
                    </>
                ))}
            </div>
        </>
    )
}