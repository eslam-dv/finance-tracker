import type { TransactionType } from "@/components/Transaction";
import { getTrasactions } from "@/lib/handleTransaction";
import { createContext, useState, useEffect, useMemo } from "react";

export type Theme = "dark" | "light";

type AppContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  transactions: TransactionType[];
  setTransactions: (transactions: TransactionType[]) => void;
  income: TransactionType[];
  totalIncome: number;
  expense: TransactionType[];
  totalExpense: number;
  balance: number;
};

type AppProviderType = {
  children: React.ReactNode;
  storageKey?: string;
  defaultTheme?: string;
};

const initialState: AppContextType = {
  theme: "dark",
  setTheme: () => null,
  transactions: [],
  setTransactions: () => null,
  income: [],
  totalIncome: 0,
  expense: [],
  totalExpense: 0,
  balance: 0,
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppContextProvider = ({
  children,
  storageKey = "vite-ui-theme",
  defaultTheme = "dark",
  ...props
}: AppProviderType) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );
  const [transactions, setTransactions] = useState<TransactionType[]>(() =>
    getTrasactions(),
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const { income, totalIncome, expense, totalExpense, balance } = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income");
    const totalIncome = income.reduce((sum, t) => (sum += t.amount), 0);

    const expense = transactions.filter((t) => t.type === "expense");
    const totalExpense = expense.reduce((sum, t) => (sum += t.amount), 0);

    return {
      income,
      totalIncome,
      expense,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }, [transactions]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    transactions,
    setTransactions: (transactions: TransactionType[]) => {
      setTransactions(transactions);
    },
    income,
    totalIncome,
    expense,
    totalExpense,
    balance,
  };

  return (
    <AppContext.Provider {...props} value={value}>
      {children}
    </AppContext.Provider>
  );
};
