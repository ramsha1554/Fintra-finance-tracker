import { useState } from "react";

const AddTransactionForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e, isExpense) => {
    e.preventDefault();
    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: isExpense
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount)),
      date: new Date().toISOString(), 
    };

    onAdd(newTransaction);
    setText("");
    setAmount("");
  };

  return (
    <form className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-2xl shadow-xl space-y-4">

      <input
        type="text"
        placeholder="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
      />

 
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
      />

      <div className="flex gap-3">
        <button
          onClick={(e) => handleSubmit(e, false)}
          className="w-1/2 bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
        >
          Add Income
        </button>
        <button
          onClick={(e) => handleSubmit(e, true)}
          className="w-1/2 bg-gradient-to-r from-red-400 to-red-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
