import { formatCurrency } from "../../../Services/FormatCurrency"


const StatsCard = ({
    title,
    child,
    icon,
    className
}) => {
    return (
        <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${className}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {child}
                    </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default StatsCard