import { useContext } from "react";

import Transaction from "@/components/Transaction";
import Summarycard from "@/components/Summarycard";
import TransactionForm from "@/components/TransactionForm";
import ExpenseBreakdownPie from "../components/ExpenseBreakdownPie";
import { type Category } from "@/components/Transaction";
import { AppContext } from "@/context/appContext";

const Dashboard = () => {
  const { transactions } = useContext(AppContext);

  const income = transactions.filter((item) => item.type == "income");
  const expense = transactions.filter((item) => item.type == "expense");

  const totalIncome = income.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );
  const totalExpenses = expense.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );
  const balance = totalIncome - totalExpenses;

  const totals = expense.reduce<Record<Category, number>>(
    (acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    },
    {} as Record<Category, number>,
  );
  const expensesByCategory = Object.entries(totals).map(
    ([category, amount]) => ({
      category: category as Category,
      amount,
    }),
  );

  return (
    <section>
      <section className="container mx-auto">
        <div className="text-center my-10">
          <h1 className="text-2xl font-bold">Finance Tracker</h1>
          <p className="text-zinc-500">
            Take control of your finances, one transaction at a time
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <Summarycard title="Balance" amount={balance} />
          <Summarycard title="Income" amount={totalIncome} />
          <Summarycard title="Expenses" amount={totalExpenses} />
        </div>

        <div className="mt-5 flex flex-col lg:flex-row-reverse gap-5 ">
          <div className="h-full flex items-center justify-center">
            <ExpenseBreakdownPie data={expensesByCategory} />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Transactions</h2>
              <TransactionForm />
            </div>

            <div className="flex flex-col gap-5 my-10">
              {transactions
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .slice(0, 5)
                .map((transaction, index) => (
                  <Transaction
                    key={index}
                    id={transaction.id}
                    title={transaction.title}
                    type={transaction.type}
                    amount={transaction.amount}
                    category={transaction.category}
                    date={transaction.date}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
