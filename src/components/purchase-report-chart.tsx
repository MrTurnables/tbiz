import { FileTextIcon } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"
import { Button } from "./ui/button"
import { DEFAULT_PURCHASE_REPORT_DATA, DEFAULT_PURCHASE_REPORT_DATA_CHART_CONFIG } from "~/lib/data"

const PurchaseReportChart = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col">
        <div className="w-full flex items-center justify-between">
            <CardTitle>Purchase Report</CardTitle>
            <Button size="sm" variant="outline" className="cursor-pointer">
                <span className="text-xs text-gray-500 dark:text-white">View Report</span>
                <FileTextIcon size={10} />
            </Button>
        </div>
        <div className="w-full flex items-center justify-between">
            <CardTitle className="flex flex-col gap-1">
                <span className="text-2xl">85%</span>
                <span className="text-sm text-gray-500 dark:text-gray-300">Purchase Ratio</span>
            </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="min-h-[200px]" config={DEFAULT_PURCHASE_REPORT_DATA_CHART_CONFIG}>
          <LineChart
            accessibilityLayer
            data={DEFAULT_PURCHASE_REPORT_DATA}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="purchase"
              type="natural"
              stroke="#9ea0f7"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="returns"
              type="natural"
              stroke="#1f7ed0"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default PurchaseReportChart