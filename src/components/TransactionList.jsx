const TransactionList = ({ transactions }) => {
  return (
    <div className="flex flex-col gap-2">
      {transactions.map((t) => (
        <div
          key={t.id}
          className={`flex justify-between items-center p-3 rounded shadow ${
            t.amount > 0 ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <div>
            <p className="font-semibold">{t.text}</p>
            <p className="text-xs text-gray-600">
              {new Date(t.date).toLocaleDateString()}{" "}
              {new Date(t.date).toLocaleTimeString()}
            </p>
          </div>
          <p className={`font-bold ${t.amount > 0 ? "text-green-700" : "text-red-700"}`}>
            {t.amount > 0 ? `+₹${t.amount}` : `-₹${Math.abs(t.amount)}`}
          </p>
        </div>
      ))}
    </div>
  );
};


export default TransactionList;
