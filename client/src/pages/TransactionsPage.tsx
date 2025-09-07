import { useContext, useState } from "react";
import { CSVLink } from "react-csv";

import { AppContext } from "@/context/appContext";
import Transaction, { type Category } from "@/components/Transaction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const headers = [
  { label: "ID", key: "id" },
  { label: "Date", key: "date" },
  { label: "Type", key: "type" },
  { label: "Title", key: "title" },
  { label: "Amount", key: "amount" },
  { label: "Category", key: "category" },
];

const TransactionsPage = () => {
  const { transactions } = useContext(AppContext);

  const [category, setCategory] = useState<Category>("");
  const [type, setType] = useState<"income" | "expense" | "">("");

  const filteredTransactions = transactions.filter((item) => {
    const matchCategory = category ? item.category === category : true;
    const matchType = type ? item.type === type : true;

    return matchCategory && matchType;
  });

  const handleReset = () => {
    setCategory("");
    setType("");
  };

  return (
    <section className="my-5">
      <div className="flex flex-wrap gap-5 justify-between items-center mb-5">
        <div className="flex gap-5 items-center">
          <Select
            value={category}
            onValueChange={(val) => setCategory(val as Category)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Show category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Salary">Salary</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
              <SelectItem value="Groceries">Groceries</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={type}
            onValueChange={(val) => setType(val as "income" | "expense" | "")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Show type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Button className="cursor-pointer" onClick={handleReset}>
            Reset
          </Button>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-zinc-400">
            Number of transactions: {filteredTransactions.length}
          </span>

          <CSVLink
            data={filteredTransactions}
            headers={headers}
            filename="transactions.csv"
            className="py-2 px-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
          >
            Save as CSV
          </CSVLink>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-5">
        {filteredTransactions
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((item, index) => (
            <Transaction
              key={index}
              id={item.id}
              date={item.date}
              type={item.type}
              title={item.title}
              amount={item.amount}
              category={item.category}
            />
          ))}
      </div>
    </section>
  );
};

export default TransactionsPage;
