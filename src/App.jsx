import { useState, useEffect } from "react";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseGraph from "./components/ExpenseGraph";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import {
  addTransactionToDB,
  getTransactionsFromDB,
  clearTransactionsFromDB,
} from "./db";
import { RiMoneyDollarCircleLine, RiShoppingCartLine, RiBarChartLine } from "react-icons/ri";

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
    <div className="min-h-screen p-6 bg-[#003049] text-white">
      {/* Header */}
      <Header />

      {/* Summary Section */}
      <div className="max-w-6xl mx-auto my-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            icon={RiMoneyDollarCircleLine}
            title="Income"
            amount={income}
            bgColor="rgba(247, 127, 0, 0.2)"
            hoverColor="rgba(6, 214, 160, 0.3)"
            textColor="#fff"
          />

          <SummaryCard
            icon={RiShoppingCartLine}
            title="Expense"
            amount={Math.abs(expense)}
            bgColor="rgba(247, 127, 0, 0.2)"
            hoverColor="rgba(6, 214, 160, 0.3)"
            textColor="#fff"
          />

          <SummaryCard
            icon={RiBarChartLine}
            title="Balance"
            amount={balance}
            bgColor="rgba(247, 127, 0, 0.2)"
            hoverColor="rgba(6, 214, 160, 0.3)"
            textColor="#fff"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
        {/* Add Transaction */}
        <div className="p-6 flex flex-col rounded-xl shadow-lg bg-[rgba(247, 127, 0, 0.2)] text-white">
          <h2 className="text-2xl font-bold text-center mb-4">Add Transaction</h2>
          <AddTransactionForm onAdd={addTransaction} disableExpense={balance <= 0} />
        </div>

        {/* Transactions List */}
        <div className="p-6 flex flex-col rounded-xl shadow-lg bg-[rgba(247, 127, 0, 0.2)]  text-[#353535]">
          <h2 className="text-2xl font-bold text-center text-white mb-4">Transactions</h2>
          <TransactionList transactions={transactions} />
        </div>

        {/* Expense Graph */}
        <div className="p-6 flex flex-col rounded-xl shadow-lg bg-[#f77f00] text-white md:col-span-2">
          <h2 className="text-2xl font-bold text-center mb-4">Balance Graph</h2>
          <ExpenseGraph transactions={transactions} />
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleReset}
          className="px-6 py-3 rounded font-semibold hover:opacity-90"
          style={{ backgroundColor: "#d65a00", color: "#fff" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
