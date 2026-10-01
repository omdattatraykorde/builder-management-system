import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function MonthlyExpenseChart({ data = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-gray-800">
          Monthly Expenses
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Overview of monthly construction expenses.
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                fill: "#f3f4f6",
              }}
              formatter={(value) => [
                `₹ ${Number(value).toLocaleString("en-IN")}`,
                "Expenses",
              ]}
            />

            <Bar
              dataKey="amount"
              fill="#2563eb"
              radius={[10, 10, 0, 0]}
              maxBarSize={55}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default MonthlyExpenseChart;