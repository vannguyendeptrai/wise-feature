import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
   
  export default function Coupon({input}) {
    return (
        <div className='flex flex-col mb-1 p-2'>
            <Card className="w-80">
                <CardHeader floated={false} className="h-80">
                <img src={input.imageUrl} alt="profile-picture" />
                </CardHeader>
                <CardBody className="text-center">
                <Typography variant="h5" className="mb-2">
                    {input.title}
                </Typography>
                <Typography>
                    By {input.sponsor}: {input.description}
                </Typography>
                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                <Typography variant="small">
                    <div className="flex items-center">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.60952 5.03491L0 10.0698H9.53619L10.5314 7.87556H5.7L8.7219 5.03491L6.96667 2.19427H15.1638L7.6 19H10.441L19 0H2.46095L5.60952 5.03491Z" fill="#00B9FF" />
                    </svg>
                    <span style={{ color: '#253655' }}>{input.require}</span>
                  </div>
                  
                  </Typography>
                <Typography variant="small" color="gray" className="flex gap-1">
                    {input.isClaimed ? "Claimed" : "Redeem"}
                </Typography>
                </CardFooter>
            </Card>
        </div>
    );
  }