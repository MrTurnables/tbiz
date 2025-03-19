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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"
import { DEFAULT_SALE_REPORT_DATA, DEFAULT_SALE_REPORT_DATA_CHART_CONFIG } from "~/lib/data"
import { Button } from "./ui/button"

const SalesReportChart = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Sales Report</CardTitle>
        <Button size="sm" variant="outline" className="cursor-pointer">
            <span className="text-xs text-gray-500 dark:text-white">View Report</span>
            <FileTextIcon size={10} />
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer className="min-h-[200px]" config={DEFAULT_SALE_REPORT_DATA_CHART_CONFIG}>
          <LineChart
            accessibilityLayer
            data={DEFAULT_SALE_REPORT_DATA}
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="store"
              type="monotone"
              stroke="#7f69ea"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="online"
              type="monotone"
              stroke="#e87fa5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default SalesReportChart