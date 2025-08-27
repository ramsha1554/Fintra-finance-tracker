import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExpenseGraph = ({ transactions }) => {
 
  const processGraphData = () => {
    const dailyData = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          income: 0,
          expense: 0,
          balance: 0
        };
      }
      
      if (transaction.amount > 0) {
        dailyData[date].income += transaction.amount;
      } else {
        dailyData[date].expense += Math.abs(transaction.amount);
      }
      dailyData[date].balance += transaction.amount;
    });


    return Object.values(dailyData)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-7); // Show last 7 days
  };

  const graphData = processGraphData();

  if (graphData.length === 0) {
    return (
      <div className="bg-white shadow p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Expense Trend</h3>
        <div className="text-center text-gray-500 py-8">
          No transaction data available for the graph
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Expense Trend (Last 7 Days)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value, name) => [
                `₹${value.toFixed(2)}`, 
                name.charAt(0).toUpperCase() + name.slice(1)
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Income"
            />
            <Line 
              type="monotone" 
              dataKey="expense" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              name="Expense"
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              name="Balance"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Expense</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Balance</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseGraph;
