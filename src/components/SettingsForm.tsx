import useSettings from '~/hooks/use-settings'
import { Label } from './ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { CURRENCIES } from '~/lib/data';

const SettingsForm = () => {
    const { currency, setCurrency } = useSettings((state)=>state);

  return (
    <div className='w-full flex flex-col gap-4 px-4'>
        <div className='w-full flex items-center justify-between'>
            <Label>Currency</Label>
            <Select value={currency} onValueChange={(v)=>setCurrency(v)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose currency" className='capitalize' />
                </SelectTrigger>
                <SelectContent className='capitalize'>
                    <SelectGroup>
                        <SelectLabel>Currencies</SelectLabel>
                        {CURRENCIES.map((c)=><SelectItem key={c.value}
                        value={c.value}>{c.label}</SelectItem>)}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
  )
}

export default SettingsForm