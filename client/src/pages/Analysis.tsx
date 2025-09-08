import { useContext, useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from "recharts";

import { AppContext } from "@/context/appContext";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

const Analysis = () => {
  const { income, expense } = useContext(AppContext);

  const chartData = useMemo(() => {
    const map = new Map<
      string,
      { date: string; income: number; expense: number; balance: number }
    >();

    income.forEach(({ date, amount }) => {
      const day = date.split("T")[0];
      if (!map.has(day)) {
        map.set(day, { date, income: 0, expense: 0, balance: 0 });
      }
      map.get(day)!.income += amount;
    });

    expense.forEach(({ date, amount }) => {
      const day = date.split("T")[0];
      if (!map.has(day)) {
        map.set(day, { date, income: 0, expense: 0, balance: 0 });
      }
      map.get(day)!.expense += amount;
    });

    map.forEach((entry) => {
      entry.balance = entry.income - entry.expense;
    });

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [income, expense]);

  const chartConfig = {
    balance: {
      label: "Balance",
      color: "#2b7fff",
    },
    income: {
      label: "Income",
      color: "#22c55e",
    },
    expense: {
      label: "Expense",
      color: "#ef4444",
    },
  } satisfies ChartConfig;

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-center text-2xl font-bold">Analysis</h2>
      {/* Balance LineChart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl mb-5">Balance</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <LineChart data={chartData}>
              <CartesianGrid />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleString("en-EG", { weekday: "short" })
                }
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="balance" stroke="#2b7fff" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      {/* Income vs Expense BarChart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Income vs Expense
          </CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart data={chartData}>
              <CartesianGrid />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-EG", {
                    weekday: "short",
                  })
                }
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#22c55e" />
              <Bar dataKey="expense" fill="#ef4444" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  );
};

export default Analysis;
