import { useEffect, useState } from 'react'
import DashboardTitle from './dashboard-title'
import SearchAndFilter from './search-and-filter';
import BalanceAndNotification from './balance-and-notification';

const OverviewTopSection = () => {
    const [today, setToday] = useState(new Date);

  useEffect(()=>{
    setInterval(()=>{
      setToday(new Date);
    }, 1000);
  },[]);
  return (
    <div className='flex gap-3 items-center justify-between'>
    <div className="flex-grow h-fit">
        <DashboardTitle
        title="Dashboard" 
        subtitle={today.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })} />
      </div>
      
      <div className="flex flex-col h-fit">
        <SearchAndFilter />
      </div>
      <div className="flex flex-col h-fit">
        <BalanceAndNotification />
      </div>
    </div>
  )
}

export default OverviewTopSection