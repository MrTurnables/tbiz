import useUser from '~/hooks/use-user'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { PlusIcon } from 'lucide-react';

const BusinessBranchesSummary = () => {
    const {user} = useUser((state)=>state);

  return (
    <Card className='min-w-[160px] py-2'>
        <CardHeader className='px-3'>
            <CardTitle>Outlets</CardTitle>
        </CardHeader>
        <CardContent className='flex-grow flex flex-col gap-4 px-3'>
            <div className='flex items-center gap-2'>
                <div className='w-[40px] h-[40px] rounded-full flex items-center justify-center overflow-hidden'>
                    {user?.shop.imageUrl ? 
                    <img src={user.shop.imageUrl} className='w-full h-full rounded-full' />:
                    <span className='border border-black w-full h-full rounded-full text-2xl flex items-center justify-center'>{user?.shop.name && user.shop.name[0]}</span>}
                </div>
                <div className='flex flex-col gap-1'>
                    <h4>{user?.shop.name}</h4>
                    {user?.shop.address && user.shop.city && user.shop.country && <small className='text-sm text-gray-700'>{user.shop.address}, {user.shop.city}, {user.shop.country}</small>}
                </div>
            </div>
            <Separator />
            <div className='flex-grow flex flex-col gap-2'>
                <div className='flex flex-col gap-1 items-center justify-center'>
                    <small className='text-center max-w-[150px]'>
                        Add outlets here if your business has more than 1 outlet
                    </small>
                    <Button className='flex items-center gap-2'>
                        <PlusIcon />
                        <span>Add outlet</span>
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default BusinessBranchesSummary