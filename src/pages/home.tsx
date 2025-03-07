import OverviewTopSection from "~/components/overview-top-section";

const Home = () => {
  return (
    <div 
    className="grow w-full min-h-[92vh] grid grid-cols-4 gap-3 p-3">
      <OverviewTopSection />

      <div className="flex items-center justify-center">
        Col 3
      </div>
      <div className="flex items-center justify-center">
        Col 4
      </div>
    </div>
  )
}

export default Home