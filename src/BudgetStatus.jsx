

function BudgetStatus({ budget, remaining, totalSpent }) {
    const getStatusColor = () => {
      if (budget === 0) return 'bg-gray-200';
      const percentage = (totalSpent / budget) * 100;
      if (percentage > 90) return 'bg-red-200';
      if (percentage > 70) return 'bg-yellow-200';
      return 'bg-green-200';
    };
  
    return (
      <div className={`p-4 rounded-lg mb-6 ${getStatusColor()}`}>
        <div className="flex justify-between mb-2">
          <span>Budget:</span>
          <span className="font-bold">${budget.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total Spent:</span>
          <span className="font-bold">${totalSpent.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Remaining:</span>
          <span className="font-bold">${remaining.toFixed(2)}</span>
        </div>
        {budget > 0 && (
          <div className="w-full bg-gray-300 rounded-full h-4 mt-3">
            <div 
              className="bg-blue-500 h-4 rounded-full" 
              style={{ width: `${Math.min((totalSpent / budget) * 100, 100)}%` }}
            ></div>
          </div>
        )}
      </div>
    );
  }
  
  export default BudgetStatus;