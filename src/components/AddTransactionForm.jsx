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
    <form className="bg-[#003049] text-white p-6 rounded-2xl shadow-xl space-y-5 font-sans">
      {/* Description Input */}
      <input
        type="text"
        placeholder="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 bg-[#1a1a1a] text-white text-lg border border-[#f77f00] rounded-xl focus:ring-2 focus:ring-[#f77f00] focus:outline-none transition"
      />

      {/* Amount Input */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 bg-[#1a1a1a] text-white text-lg border border-[#06D6A0] rounded-xl focus:ring-2 focus:ring-[#06D6A0] focus:outline-none transition"
      />

      {/* Buttons */}
      <div className="flex gap-4">
        {/* Income Button (Teal) */}
        <button
          onClick={(e) => handleSubmit(e, false)}
          className="w-1/2 bg-[#06D6A0] text-[#1a1a1a] text-lg font-bold tracking-wide 
                     hover:bg-gradient-to-r hover:from-[#06D6A0] hover:to-[#04b58a]
                     active:scale-105 py-3 rounded-xl shadow-lg transition-transform duration-200"
        >
          Add Income
        </button>

        {/* Expense Button (Orange) */}
        <button
          onClick={(e) => handleSubmit(e, true)}
          className="w-1/2 bg-[#f77f00] text-white text-lg font-bold tracking-wide 
                     hover:bg-gradient-to-r hover:from-[#f77f00] hover:to-[#d65a00]
                     active:scale-105 py-3 rounded-xl shadow-lg transition-transform duration-200"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;

