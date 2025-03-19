import BusinessBranchesSummary from "~/components/business-branches-summary";
import InvoicesSummary from "~/components/invoices-summary";
import OverviewTopSection from "~/components/overview-top-section";
import PurchaseReportChart from "~/components/purchase-report-chart";
import RepeatRateChart from "~/components/repeat-rate-chart";
import SalesReportChart from "~/components/sales-report-chart";
import SummaryValueCard from "~/components/SummaryValueCard";

const Home = () => {
  const cards = [
    {
      id:1,
      title:"Total Sales",
      value:29098,
      change:{
          rate:7.19,
          direction:"+"
      }
    },
    {
      id:2,
      title:"Total Revenue",
      value:39098,
      change:{
          rate:9.199,
          direction:"+"
      }
    },
    {
      id:3,
      title:"Total Sales",
      value:10098,
      change:{
          rate:1.1,
          direction:"-"
      }
    },
  ] as const;

  return (
    <div className="grow w-full min-h-[92vh] gap-3 p-3 flex flex-col">
      <OverviewTopSection />

      <div className="flex-grow flex gap-3">
        <div className="flex-grow flex flex-col gap-3">
          <div className="flex justify-between gap-3">
            {cards.map((card)=><SummaryValueCard
              key={card.id}
              title={card.title}
              value={card.value}
              change={card.change}
            />)}
          </div>

          <div className="flex gap-3 justify-between">
            <div className="flex-1">
              <SalesReportChart />
            </div>
            <div className="flex-1">
              <RepeatRateChart />
            </div>
          </div>
        </div>

        <div className="md:flex hidden">
          <BusinessBranchesSummary />
        </div>
      </div>

      <div className="flex gap-3 justify-between">
        <div className="flex-1">
          <PurchaseReportChart />
        </div>
        <div className="flex-3">
          <InvoicesSummary />
        </div>
      </div>
    </div>
  )
}

export default Home