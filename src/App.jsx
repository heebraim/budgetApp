

// App.jsx
// import { useState, useEffect } from 'react';
// import BudgetDashboard from './BudgetDashboard';
// import ExpenseForm from './ExpenseForm';
// import ExpenseList from './ExpenseList';

// function App() {
//   const [budget, setBudget] = useState(0);
//   const [expenses, setExpenses] = useState([]);
//   const [remaining, setRemaining] = useState(0);
//   const [totalSpent, setTotalSpent] = useState(0);
//   const [isEditingBudget, setIsEditingBudget] = useState(false);
//   const [newBudgetAmount, setNewBudgetAmount] = useState(0);

//   // Load saved data when app starts
//   useEffect(() => {
//     const savedBudget = localStorage.getItem('budget');
//     const savedExpenses = localStorage.getItem('expenses');
    
//     if (savedBudget) setBudget(Number(savedBudget));
//     if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
//   }, []);

//   // Calculate remaining and total spent
//   useEffect(() => {
//     const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//     setTotalSpent(total);
//     setRemaining(budget - total);
    
//     // Save to localStorage
//     localStorage.setItem('budget', budget.toString());
//     localStorage.setItem('expenses', JSON.stringify(expenses));
//   }, [budget, expenses]);

//   const addExpense = (expense) => {
//     setExpenses([...expenses, expense]);
//   };

//   const deleteExpense = (id) => {
//     setExpenses(expenses.filter(expense => expense.id !== id));
//   };

//   const startEditBudget = () => {
//     setIsEditingBudget(true);
//     setNewBudgetAmount(budget);
//   };

//   const saveBudgetEdit = (action) => {
//     if (action === 'add') {
//       setBudget(budget + Number(newBudgetAmount));
//     } else if (action === 'update') {
//       setBudget(Number(newBudgetAmount));
//     }
//     setIsEditingBudget(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold text-center mb-6">Budget Tracker</h1>
        
//         <BudgetDashboard 
//           budget={budget}
//           remaining={remaining}
//           totalSpent={totalSpent}
//           isEditingBudget={isEditingBudget}
//           newBudgetAmount={newBudgetAmount}
//           setNewBudgetAmount={setNewBudgetAmount}
//           startEditBudget={startEditBudget}
//           saveBudgetEdit={saveBudgetEdit}
//         />
        
//         <ExpenseForm onAddExpense={addExpense} />
        
//         <ExpenseList 
//           expenses={expenses} 
//           onDeleteExpense={deleteExpense} 
//         />
//       </div>
//     </div>
//   );
// }

// export default App;





import { useState, useEffect } from 'react';

function App() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  // Calculate totals
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = budget - totalSpent;

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('budget', budget.toString());
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [budget, expenses]);

  // Load from localStorage
  useEffect(() => {
    const savedBudget = localStorage.getItem('budget');
    const savedExpenses = localStorage.getItem('expenses');
    if (savedBudget) setBudget(Number(savedBudget));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  const addExpense = () => {
    if (!expenseName || !expenseAmount) return;
    
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        name: expenseName,
        amount: Number(expenseAmount)
      }
    ]);
    
    setExpenseName('');
    setExpenseAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-md mx-auto">
        {/* Budget Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Set Budget</h2>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full p-3 border rounded mb-4 text-lg"
          />
        </div>
        
        {/* Add Expense */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Add Expense</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="Name"
              className="w-full p-3 border rounded text-lg"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="Amount"
                className="flex-1 p-3 border rounded text-lg"
              />
              <button
                onClick={addExpense}
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-lg"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
        
        {/* Expenses List */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Expenses</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-500 py-2 text-lg">No expenses added yet.</p>
          ) : (
            <ul className="space-y-3">
              {expenses.map((expense) => (
                <li key={expense.id} className="p-3 border rounded text-lg">
                  <div className="font-medium">{expense.name}</div>
                  <div className="flex justify-between items-center">
                    <span>₦{expense.amount.toLocaleString()}</span>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Budget Summary */}
        <div className="p-4 border-t">
          <div className="flex justify-between mb-1 text-lg">
            <span>Total Budget:</span>
            <span className="font-medium">₦{budget.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-1 text-lg">
            <span>Total Spent:</span>
            <span className="font-medium">₦{totalSpent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>Remaining:</span>
            <span className="font-medium">₦{remaining.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;