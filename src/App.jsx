import { useState, useEffect } from "react";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseGraph from "./components/ExpenseGraph";
import {
  addTransactionToDB,
  getTransactionsFromDB,
  clearTransactionsFromDB,
} from "./db";

const App = () => {
  const [transactions, setTransactions] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      const savedTransactions = (await getTransactionsFromDB()) || [];
      setTransactions(savedTransactions);
    };
    fetchData();
  }, []);


  const addTransaction = async (transaction) => {
    await addTransactionToDB(transaction);
    setTransactions((prev) => [...prev, transaction]);
  };


  const handleReset = async () => {
    await clearTransactionsFromDB();
    setTransactions([]);
  };


  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = income + expense;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">

   
        <div
          className="p-6 flex flex-col gap-4 rounded-xl shadow-lg"
          style={{ backgroundColor: "var(--ash-gray)", color: "var(--night)" }}
        >
          <h2 className="text-2xl font-bold text-center">Summary</h2>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div
              className="flex-1 p-4 rounded-lg text-center shadow-inner"
              style={{ backgroundColor: "var(--timberwolf)", color: "var(--night)" }}
            >
              <h3 className="font-semibold">Income</h3>
              <p className="text-2xl font-bold">₹{income}</p>
            </div>
            <div
              className="flex-1 p-4 rounded-lg text-center shadow-inner"
              style={{ backgroundColor: "var(--auburn)", color: "var(--timberwolf)" }}
            >
              <h3 className="font-semibold">Expense</h3>
              <p className="text-2xl font-bold">₹{Math.abs(expense)}</p>
            </div>
            <div
              className="flex-1 p-4 rounded-lg text-center shadow-inner"
              style={{ backgroundColor: "var(--burnt-umber)", color: "var(--timberwolf)" }}
            >
              <h3 className="font-semibold">Balance</h3>
              <p className="text-2xl font-bold">₹{balance}</p>
            </div>
          </div>
        </div>

  
        <div
          className="p-6 flex flex-col rounded-xl shadow-lg"
          style={{ backgroundColor: "var(--night)", color: "var(--timberwolf)" }}
        >
          <h2 className="text-2xl font-bold text-center mb-4">Add Transaction</h2>
          <AddTransactionForm onAdd={addTransaction} disableExpense={balance <= 0} />
        </div>

        <div
          className="p-6 flex flex-col rounded-xl shadow-lg"
          style={{ backgroundColor: "var(--ash-gray)", color: "var(--night)" }}
        >
          <h2 className="text-2xl font-bold text-center mb-4">Transactions</h2>
          <TransactionList transactions={transactions} />
        </div>

        {/* Bottom Right: Expense Graph */}
        <div
          className="p-6 flex flex-col rounded-xl shadow-lg"
          style={{ backgroundColor: "var(--timberwolf)", color: "var(--night)" }}
        >
          <h2 className="text-2xl font-bold text-center mb-4">Expense Graph</h2>
          <ExpenseGraph transactions={transactions} />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="px-6 py-3 rounded font-semibold hover:opacity-90"
          style={{ backgroundColor: "var(--auburn)", color: "var(--timberwolf)" }}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
