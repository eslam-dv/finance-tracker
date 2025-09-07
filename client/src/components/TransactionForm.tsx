import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Pen } from "lucide-react";

import type { Category, TransactionType } from "./Transaction";
import { addTransaction, editTransaction } from "@/lib/handleTransaction";
import { AppContext } from "@/context/appContext";

type Props = {
  transaction?: TransactionType;
};

const TransactionForm = ({ transaction }: Props) => {
  const { setTransactions } = useContext(AppContext);

  const [type, setType] = useState<"expense" | "income" | "">("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<Category>("");
  const [title, setTitle] = useState<string>("");

  // prefill when editing
  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setCategory(transaction.category);
      setAmount(transaction.amount);
      setTitle(transaction.title);
    }
  }, [transaction]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!type || !category || !title || !amount) return;

    if (transaction) {
      // Edit mode
      const updated = editTransaction(transaction.id, {
        ...transaction,
        type,
        amount,
        category,
        title,
        date: new Date().toISOString(),
      });

      setTransactions(updated);
    } else {
      // Add mode
      const newTx: TransactionType = {
        id: Date.now().toString(),
        type,
        amount,
        category,
        title,
        date: new Date().toISOString(),
      };

      const updated = addTransaction(newTx);

      setTransactions(updated);
    }

    // Reset form
    setType("");
    setAmount(0);
    setCategory("");
    setTitle("");

    // Close dialog
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {transaction ? (
          <div className="text-yellow-500 p-1 rounded-md hover:text-white hover:bg-yellow-500 cursor-pointer">
            <Pen size={20} />
          </div>
        ) : (
          <Button className="cursor-pointer" variant="default">
            + Add Transaction
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="my-2">
            <DialogTitle className="text-xl">
              {transaction ? "Edit Transaction" : "Add New Transaction"}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                required
                value={type}
                onValueChange={(val) => setType(val as "income" | "expense")}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="amount">Amount ($) *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                required
                value={category}
                onValueChange={(val) =>
                  setCategory(
                    val as
                      | "Salary"
                      | "Rent"
                      | "Groceries"
                      | "Transportation"
                      | "Food"
                      | "Entertainment"
                      | "Other",
                  )
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="select category" />
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
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="transaction title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="w-full">
            <div className="flex flex-row-reverse w-full gap-2 mt-5">
              <DialogClose asChild>
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="flex-1">
                {transaction ? "Save Changes" : "Add Transaction"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;
