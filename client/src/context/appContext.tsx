import type { TransactionType } from "@/components/Transaction";
import { getTrasactions } from "@/lib/handleTransaction";
import { createContext, useState, useEffect } from "react";

export type Theme = "dark" | "light";

type AppContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  transactions: TransactionType[];
  setTransactions: (transactions: TransactionType[]) => void;
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
  };

  return (
    <AppContext.Provider {...props} value={value}>
      {children}
    </AppContext.Provider>
  );
};
