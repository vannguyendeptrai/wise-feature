import Link from 'next/link'
import moment from 'moment';
import { Progress, Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography} from "@material-tailwind/react";

  //const parsed_date = new Date('2011-04-11T10:20:30Z')
  //<Typography variant="small">{Date('2022-11-28').moment().format('D/MM/YYYY')}</Typography>

export default function Saving({ saving }) {

  console.log(new Date('2011-04-11T10:20:30Z'))

  return (
    <>
      <div className='flex flex-col mb-4 border border-3 border-black p-10 bg-gray-200 mx-20 my-10'>
        <div className='flex flex-shrink-0 pb-0 '>
          <div className='flex-shrink-0 block group '>
            <div className='flex items-center text-gray-800'>
              Created by 
              <Link href={`/user/${saving.owner.id}`}>
                <a className='ml-1 underline'>{saving.owner.name}</a>
              </Link>{' '}
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <Link href={`/saving/${saving.id}`}>
            <a className='flex-shrink text-2xl font-bold color-primary width-auto'>
              {saving.title}
            </a>
          </Link>
              <p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
                  {saving.content}
              </p>
              <p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
                  Goal: {saving.savingGoal}
              </p>
              <p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
                  Deadline: {saving.deadline}
              </p>
              <p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
                  Frequency: {saving.period} - Unit: {saving.calculateUnit !== 0 ? saving.calculateUnit : "End of Month"}
              </p>
        </div>
      </div>

      <div className='flex flex-col mb-4 border border-3 border-black p-10 bg-gray-200 mx-20 my-10 items-center'>
        <Card className="w-1/2">
        <CardBody>
          <Typography variant="h5" className="mb-2">
            <Link href={`/saving/${saving.id}`}>
              <a className='flex-shrink text-2xl font-bold color-primary width-auto'>
                {saving.title}
              </a>
            </Link>
          </Typography>
          <Typography>
            {saving.content}
          </Typography>
          <div className='flex justify-between'>
            <span variant="small">
              $199 / ${saving.savingGoal}
            </span>
            <span variant="small">
              30%
            </span>
          </div>
          <Progress value={67} />
        </CardBody>
        <CardFooter divider className="flex items-center justify-end py-3">
        <Typography variant="small">{saving.deadline}</Typography>
        
          
        </CardFooter>
      </Card>
    </div>
    </>
  )
}