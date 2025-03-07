import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const SearchAndFilter = () => {
  return (
    <div className="w-full flex lg:flex-row flex-col gap-1 lg:items-center justify-center">
        <div className="lg:flex-2 relative">
            <Input
                placeholder="Search" 
                className="w-full pr-2" 
            />
            <SearchIcon 
                size={16}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400" 
            />
        </div>
        <div className="lg:flex-1 flex items-center justify-center flex-wrap">
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="year">This year</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="custom">Custom...</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
  )
}

export default SearchAndFilter