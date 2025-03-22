import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { EyeIcon } from 'lucide-react'
import { DataTable } from './data-table'
import { DEFAULT_INVOICE_LIST } from '~/lib/data'
import { invoiceColumns } from '~/lib/component-data'

const InvoicesSummary = () => {
  return (
    <Card className='min-h-full'>
        <CardHeader className='w-full flex items-center justify-between'>
            <CardTitle>Invoices</CardTitle>
            <Button size="sm" variant="outline" className="cursor-pointer">
                <span className="text-xs text-gray-500 dark:text-white">View all</span>
                <EyeIcon size={10} />
            </Button>
        </CardHeader>

        <CardContent>
            <DataTable columns={invoiceColumns} data={DEFAULT_INVOICE_LIST} filterColumn='id' />
        </CardContent>
    </Card>
  )
}

export default InvoicesSummary