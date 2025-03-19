import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import useUser from '~/hooks/use-user';
import useSettings from '~/hooks/use-settings';
import { formatCurrency } from '~/lib/utils';
import { DEFAULT_COUNTRY } from '~/lib/data';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface SummaryValueCardProps {
    title:string;
    value:number;
    change:{
        rate:number;
        direction:"+"|"-"
    }
}

const SummaryValueCard:React.FC<SummaryValueCardProps> = ({
    title,
    value,
    change
}) => {
  const { user } = useUser((state)=>state);
  const { currency } = useSettings((state)=>state);
  return (
    <Card className='flex-grow py-3 gap-1'>
      <CardHeader className='px-3'>
        <CardTitle className='lg:text-sm text-xs uppercase font-mono font-medium'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='flex items-center flex-wrap justify-between gap-3 px-3'>
        <div className='flex flex-col gap-1'>
          <h3 className='lg:text-base text-sm font-semibold'>{formatCurrency(value,currency,user?.shop.country || DEFAULT_COUNTRY)}</h3>
          {change.direction==="+" ? 
          <small className='text-green-700 flex items-center gap-1 lg:text-[10px] text-[8px]'>
            <span className='flex items-center p-1 rounded-full bg-green-700/20'>
              <ArrowUpRight size={10} />
            </span>
            <span>{change.direction}{change.rate}%</span>
          </small> :
          <small className='text-red-700 flex items-center gap-1 lg:text-[10px] text-[8px]'>
            <span className='flex items-center p-1 rounded-full bg-red-700/20'>
              <ArrowDownRight size={10} />
            </span>
            <span>{change.direction}{change.rate}%</span>
          </small>}
        </div>

        <div className='flex-grow lg:flex hidden items-end justify-end gap-2 h-full'>
          <div className='rounded-xs w-[2px] h-full bg-gray-200 flex flex-col items-center justify-end'>
            <div className='w-full h-[30%] bg-blue-700'></div>
          </div>
          <div className='rounded-xs w-[2px] h-full bg-gray-200 flex flex-col items-center justify-end'>
            <div className='w-full h-[90%] bg-blue-700'></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SummaryValueCard