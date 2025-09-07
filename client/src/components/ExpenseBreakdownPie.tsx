import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  type TooltipProps,
  Legend,
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import type { Category } from "./Transaction";

const chartConfig: Record<Category, { label: string; color: string }> = {
  "": { label: "Uncategorized", color: "#9ca3af" },
  Salary: { label: "Salary", color: "#22c55e" },
  Rent: { label: "Rent", color: "#ef4444" },
  Groceries: { label: "Groceries", color: "#2b7fff" },
  Transportation: { label: "Transportation", color: "#eab308" },
  Food: { label: "Food", color: "#f97316" },
  Entertainment: { label: "Entertainment", color: "#a855f7" },
  Other: { label: "Other", color: "#6a7282" },
} satisfies ChartConfig;

type Expensedata = {
  category: Category;
  amount: number;
};

const ExpenseBreakdownPie = ({ data }: { data: Expensedata[] }) => {
  const total = data.reduce((sum, d) => sum + d.amount, 0);

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const entry = payload[0];
      const value = entry.value as number;
      const percent = ((value / total) * 100).toFixed(1);
      return (
        <div className="flex gap-3 bg-white rounded-md p-1 items-center dark:text-black">
          <span
            className={`h-2 w-2`}
            style={{ backgroundColor: chartConfig[entry.name as keyof typeof chartConfig].color }}
          ></span>
          <p className="font-semibold">{entry.name}</p>
          <p>{percent}%</p>
        </div>
      );
    }

    return null;
  };

  const renderLegend = () => (
    <ul className="flex flex-wrap gap-2 justify-center pt-5">
      {data.map((entry, index) => (
        <li key={`legend-${index}`} className="flex items-center space-x-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: chartConfig[entry.category].color }}
          />
          <span>{chartConfig[entry.category].label}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <Card className="h-fit w-fit">
      <CardHeader>
        <CardTitle className="text-center">Expense Breakdown</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-70 w-70">
          <PieChart>
            <Pie
              dataKey="amount"
              nameKey="category"
              data={data}
              innerRadius={50}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.category].color}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExpenseBreakdownPie;
