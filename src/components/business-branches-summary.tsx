import useOutlets from '~/hooks/use-outlets';
import useUser from '~/hooks/use-user';
import { ShopOutletType } from '~/lib/types';
import AddShopOutletForm from './add-shop-outlet-form';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

const BusinessBranchesSummary = () => {
    const {outlets,selectedOutlet, selectOutlet} = useOutlets((state)=>state);
    const {user} = useUser((state)=>state);
    
    const outlet = selectedOutlet ? 
                outlets.find((otl)=>otl.$id===selectedOutlet) :
                outlets.find((otl)=>otl.type===ShopOutletType.MAIN);

  return (
    <Card className='min-w-[180px] py-2 gap-1'>
        <CardHeader className='px-3'>
            <CardTitle>Outlet</CardTitle>
        </CardHeader>
        <CardContent className='flex-grow flex flex-col gap-4 px-3'>
            <div className='flex items-center gap-2'>
                <div className='flex flex-col gap-1'>
                    {outlet ?
                    <>
                        <h4>{outlet.name}</h4>
                        <small className='text-sm text-gray-700 flex flex-col'>
                            <span>{outlet.address}</span> 
                            <span>{outlet.city}</span>
                            <span>{outlet.country}</span>
                        </small>
                    </> : 
                    null}
                </div>
            </div>
            <Separator />
            <div className='flex-grow flex flex-col gap-2'>
                <h5 className='font-bold'>All outlets</h5>
                {outlets.length > 0 && <div className='w-full flex flex-col gap-2'>
                    {outlets.map((otl)=><Button
                    className='w-full'
                    onClick={()=>selectOutlet(otl.$id)}
                    variant={selectedOutlet===otl.$id ? "default" : "outline"} key={otl.$id}>
                        {otl.name}
                    </Button>)}
                </div>}
                <div className='flex flex-col gap-1 items-center justify-center'>
                    {outlets.length > 0 ? null : <small className='text-center max-w-[150px]'>
                        Add outlets here if your business has more than 1 outlet
                    </small>}
                    {user && <AddShopOutletForm
                        shopId={user.shopId}
                        userId={user.$id}
                        initial={{
                            name:"",
                            address:"",
                            city:"",
                            country:""
                        }}
                    />}
                    
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default BusinessBranchesSummary