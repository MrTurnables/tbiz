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
    <>
    <div className="col-span-2">
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
      
      <div className="flex flex-col">
        <SearchAndFilter />
      </div>
      <div className="flex flex-col">
        <BalanceAndNotification />
      </div>
    </>
  )
}

export default OverviewTopSection