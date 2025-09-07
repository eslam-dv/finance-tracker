import type { TransactionType } from "@/components/Transaction";

export const addTransaction = (newTransaction: TransactionType) => {
  const transactions = localStorage.getItem("transactions");

  const parsed = transactions ? JSON.parse(transactions) : [];

  const updated = [...parsed, newTransaction];

  localStorage.setItem("transactions", JSON.stringify(updated));

  return updated;
};

export const getTrasactions = () => {
  const transactions = localStorage.getItem("transactions");

  const parsed = transactions ? JSON.parse(transactions) : [];

  return parsed;
};

export const editTransaction = (id: string, updatedVal: TransactionType) => {
  const transactions = localStorage.getItem("transactions");

  const parsed = transactions
    ? (JSON.parse(transactions) as TransactionType[])
    : [];

  const updated = parsed.map((item) =>
    item.id == id ? { ...item, ...updatedVal } : item,
  );

  localStorage.setItem("transactions", JSON.stringify(updated));

  return updated;
};

export const deleteTransaction = (id: string) => {
  const transactions = localStorage.getItem("transactions");

  const parsed = transactions
    ? (JSON.parse(transactions) as TransactionType[])
    : [];

  const updated = parsed.filter((item) => item.id !== id);

  localStorage.setItem("transactions", JSON.stringify(updated));

  return updated;
};
