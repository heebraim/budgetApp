

// BudgetDashboard.jsx
function BudgetDashboard({
    budget,
    remaining,
    totalSpent,
    isEditingBudget,
    newBudgetAmount,
    setNewBudgetAmount,
    startEditBudget,
    saveBudgetEdit
  }) {
    const getStatusColor = () => {
      if (budget === 0) return 'bg-gray-200';
      const percentage = (totalSpent / budget) * 100;
      if (percentage > 90) return 'bg-red-200';
      if (percentage > 70) return 'bg-yellow-200';
      return 'bg-green-200';
    };
  
    return (
      <div className={`p-4 rounded-lg mb-6 ${getStatusColor()}`}>
        {isEditingBudget ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span>New Budget:</span>
              <input
                type="number"
                value={newBudgetAmount}
                onChange={(e) => setNewBudgetAmount(e.target.value)}
                className="flex-1 p-1 border rounded"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => saveBudgetEdit('update')}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Update Budget
              </button>
              <button 
                onClick={() => saveBudgetEdit('add')}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add to Budget
              </button>
              <button 
                onClick={() => setIsEditingBudget(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-2">
              <span>Budget:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">${budget.toFixed(2)}</span>
                <button 
                  onClick={startEditBudget}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Spent:</span>
              <span className="font-bold">${totalSpent.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining:</span>
              <span className="font-bold">${remaining.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    );
  }
  
  export default BudgetDashboard;