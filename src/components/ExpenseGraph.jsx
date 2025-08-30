import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExpenseGraph = ({ transactions }) => {
  const processGraphData = () => {
    const dailyData = {};
    let runningBalance = 0;

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

      if (!dailyData[formattedDate]) {
        dailyData[formattedDate] = { date: formattedDate, balance: runningBalance };
      }

      runningBalance += transaction.amount;
      dailyData[formattedDate].balance = runningBalance;
    });

    return Object.values(dailyData)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const graphData = processGraphData();

  if (graphData.length === 0) {
    return (
      <div className="bg-[#003049] text-white shadow-lg p-6 rounded-xl mb-6">
        <h3 className="text-xl font-semibold mb-4">Balance Trend</h3>
        <div className="text-center text-gray-300 py-8">
          No transaction data available for the graph
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#003049] text-white shadow-lg p-6 rounded-xl mb-6">
      <h3 className="text-xl font-semibold mb-4">Balance Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <CartesianGrid stroke="#ffffff22" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: '#ffffff' }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#ffffff' }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#003049',
                border: '1px solid #f77f00',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value) => [`₹${value.toFixed(2)}`, 'Balance']}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#f77f00"
              strokeWidth={3}
              dot={{ fill: '#f77f00', strokeWidth: 2, r: 4 }}
              name="Balance"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseGraph;

