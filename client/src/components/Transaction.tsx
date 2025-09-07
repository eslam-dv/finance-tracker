import { CardContent, Card } from "@/components/ui/card";
import { deleteTransaction } from "@/lib/handleTransaction";
import {
  Briefcase,
  Car,
  ForkKnife,
  House,
  ShoppingCart,
  Gamepad2,
  Ellipsis,
  Trash,
} from "lucide-react";

import TransactionForm from "./TransactionForm";
import { useContext } from "react";
import { AppContext } from "@/context/appContext";

export type Category =
  | ""
  | "Salary"
  | "Rent"
  | "Groceries"
  | "Transportation"
  | "Food"
  | "Entertainment"
  | "Other";

export type TransactionType = {
  id: string;
  title: string;
  type: "expense" | "income" | "";
  amount: number;
  category: Category;
  date: string;
};

const Transaction = ({
  id,
  title,
  type,
  amount,
  category,
  date,
}: TransactionType) => {
  const { setTransactions } = useContext(AppContext);

  const removeTransaction = () => {
    const updated = deleteTransaction(id);
    setTransactions(updated);
  };

  const transaction: TransactionType = {
    id,
    title,
    type,
    amount,
    category,
    date,
  };

  return (
    <Card className="hover:-translate-y-1 hover:shadow-md duration-150">
      <CardContent className="flex gap-4 items-center">
        <Icon category={category} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{title}</h3>
            <p
              className={`font-semibold ${type == "income" ? "text-green-500" : "text-red-500"}`}
            >
              {type == "income" ? "+" : "-"}${amount}
            </p>
          </div>
          <div className="flex items-center justify-between text-zinc-500">
            <p>{category}</p>
            <p>{date.split("T")[0]}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="text-red-500 p-1 rounded-md hover:text-white hover:bg-red-500 cursor-pointer"
            onClick={removeTransaction}
          >
            <Trash size={20} />
          </div>
          <TransactionForm transaction={transaction} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Transaction;

const Icon = ({ category }: { category: Category }) => {
  switch (category) {
    case "Salary":
      return <Salary />;
    case "Rent":
      return <Rent />;
    case "Groceries":
      return <Groceries />;
    case "Transportation":
      return <Transportation />;
    case "Food":
      return <Food />;
    case "Entertainment":
      return <Entertainment />;
    case "Other":
      return <Other />;
    default:
      return <Other />;
  }
};

const Salary = () => (
  <div className="text-white bg-green-500 p-2 rounded-full">
    <Briefcase />
  </div>
);

const Rent = () => (
  <div className="text-white bg-red-500 p-2 rounded-full">
    <House />
  </div>
);

const Groceries = () => (
  <div className="text-white bg-blue-500 p-2 rounded-full">
    <ShoppingCart />
  </div>
);

const Transportation = () => (
  <div className="text-white bg-yellow-500 p-2 rounded-full">
    <Car />
  </div>
);

const Food = () => (
  <div className="text-white bg-orange-500 p-2 rounded-full">
    <ForkKnife />
  </div>
);

const Entertainment = () => (
  <div className="text-white bg-purple-500 p-2 rounded-full">
    <Gamepad2 />
  </div>
);

const Other = () => (
  <div className="text-white bg-gray-500 p-2 rounded-full">
    <Ellipsis />
  </div>
);
