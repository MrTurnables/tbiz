import useUser from '~/hooks/use-user';
import AddShopOutletForm from './add-shop-outlet-form';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { ShopOutlet } from '~/lib/types';

const BusinessBranchesSummary = () => {
    const {selectedOutlet, setSelectedOutlet} = useUser((state)=>state);
    const outlets:ShopOutlet[] = [];


  return (
    <Card className='min-w-[180px] py-2'>
        <CardHeader className='px-3'>
            <CardTitle>Outlet</CardTitle>
        </CardHeader>
        <CardContent className='flex-grow flex flex-col gap-4 px-3'>
            <div className='flex items-center gap-2'>
                <div className='flex flex-col gap-1'>
                    {/* {outlet ?
                    <>
                        <h4>{outlet.name}</h4>
                        <small className='text-sm text-gray-700 flex flex-col'>
                            <span>{outlet.address}</span> 
                            <span>{outlet.city}</span>
                            <span>{outlet.country}</span>
                        </small>
                    </> : 
                    null} */}
                </div>
            </div>
            <Separator />
            <div className='flex-grow flex flex-col gap-2'>
                <h5 className='font-bold'>All outlets</h5>
                {outlets.length > 0 && <div className='w-full flex flex-col gap-2'>
                    {outlets.map((otl)=><Button
                    className='w-full'
                    onClick={()=>setSelectedOutlet(otl.$id)}
                    variant={selectedOutlet===otl.$id ? "default" : "outline"} key={otl.$id}>
                        {otl.name}
                    </Button>)}
                </div>}
                <div className='flex flex-col gap-1 items-center justify-center'>
                    {outlets.length > 0 ? null : <small className='text-center max-w-[150px]'>
                        Add outlets here if your business has more than 1 outlet
                    </small>}
                    <AddShopOutletForm
                        shop={null}
                        initial={{
                            name:"",
                            address:"",
                            city:"",
                            country:""
                        }}
                    />
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default BusinessBranchesSummary