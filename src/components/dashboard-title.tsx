interface DashboardTitleProps {
    title:string;
    subtitle:string;
}

const DashboardTitle = ({
    title, subtitle
}:DashboardTitleProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
        <h1 className="text-xl font-bold text-black dark:text-white">{title}</h1>
        <h4 className="text-sm text-gray-500 dark:text-gray-300">{subtitle}</h4>
    </div>
  )
}

export default DashboardTitle