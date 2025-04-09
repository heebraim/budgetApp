

import { useState } from 'react';

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const startEditing = (expense) => {
    setEditingId(expense.id);
    setEditName(expense.name);
    setEditAmount(expense.amount);
  };

  const saveEdit = (id) => {
    onEditExpense(id, {
      id,
      name: editName,
      amount: Number(editAmount)
    });
    setEditingId(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Your Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet</p>
      ) : (
        <ul className="space-y-2">
          {expenses.map((expense) => (
            <li key={expense.id} className="flex justify-between items-center p-2 border rounded">
              {editingId === expense.id ? (
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 p-1 border rounded"
                  />
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-20 p-1 border rounded"
                  />
                  <button 
                    onClick={() => saveEdit(expense.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex-1">{expense.name} - ${expense.amount.toFixed(2)}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => startEditing(expense)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDeleteExpense(expense.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;