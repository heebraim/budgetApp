

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
//     <div className="min-h-screen p-4 bg-gray-100">
//       <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
//         <h1 className="mb-6 text-2xl font-bold text-center">Budget Tracker</h1>
        
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





// import { useState, useEffect } from 'react';

// function App() {
//   const [budget, setBudget] = useState('');
//   const [expenses, setExpenses] = useState([]);
//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');

//   // Calculate totals
//   const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//   const remaining = budget - totalSpent;

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem('budget', budget.toString());
//     localStorage.setItem('expenses', JSON.stringify(expenses));
//   }, [budget, expenses]);

//   // Load from localStorage
//   useEffect(() => {
//     const savedBudget = localStorage.getItem('budget');
//     const savedExpenses = localStorage.getItem('expenses');
//     if (savedBudget) setBudget(Number(savedBudget));
//     if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
//   }, []);

//   const addExpense = () => {
//     if (!expenseName || !expenseAmount) return;
    
//     setExpenses([
//       ...expenses,
//       {
//         id: Date.now(),
//         name: expenseName,
//         amount: Number(expenseAmount)
//       }
//     ]);
    
//     setExpenseName('');
//     setExpenseAmount('');
//   };

//   const deleteExpense = (id) => {
//     setExpenses(expenses.filter(expense => expense.id !== id));
//   };

//   return (
//     <div className="min-h-screen p-4 font-sans bg-gray-50">
//       <div className="max-w-md mx-auto">
//         {/* Budget Section */}
//         <div className="mb-6">
//           <h2 className="mb-2 text-lg font-semibold">Set Budget</h2>
//           <input
//             type="number"
//             value={budget}
//             onChange={(e) => setBudget(Number(e.target.value))}
//             className="w-full p-3 mb-4 text-lg border rounded"
//           />
//         </div>
        
//         {/* Add Expense */}
//         <div className="mb-6">
//           <h2 className="mb-2 text-lg font-semibold">Add Expense</h2>
//           <div className="space-y-2">
//             <input
//               type="text"
//               value={expenseName}
//               onChange={(e) => setExpenseName(e.target.value)}
//               placeholder="Name"
//               className="w-full p-3 text-lg border rounded"
//             />
//             <div className="flex gap-2">
//               <input
//                 type="number"
//                 value={expenseAmount}
//                 onChange={(e) => setExpenseAmount(e.target.value)}
//                 placeholder="Amount"
//                 className="flex-1 p-3 text-lg border rounded"
//               />
//               <button
//                 onClick={addExpense}
//                 className="px-6 py-3 text-lg text-white bg-blue-500 rounded hover:bg-blue-600"
//               >
//                 Add Expense
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Expenses List */}
//         <div className="mb-6">
//           <h2 className="mb-2 text-lg font-semibold">Expenses</h2>
//           {expenses.length === 0 ? (
//             <p className="py-2 text-lg text-gray-500">No expenses added yet.</p>
//           ) : (
//             <ul className="space-y-3">
//               {expenses.map((expense) => (
//                 <li key={expense.id} className="p-3 text-lg border rounded">
//                   <div className="font-medium">{expense.name}</div>
//                   <div className="flex items-center justify-between">
//                     <span>₦{expense.amount.toLocaleString()}</span>
//                     <button
//                       onClick={() => deleteExpense(expense.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
        
//         {/* Budget Summary */}
//         <div className="p-4 border-t">
//           <div className="flex justify-between mb-1 text-lg">
//             <span>Total Budget:</span>
//             <span className="font-medium">₦{budget.toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between mb-1 text-lg">
//             <span>Total Spent:</span>
//             <span className="font-medium">₦{totalSpent.toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between text-lg">
//             <span>Remaining:</span>
//             <span className="font-medium">₦{remaining.toLocaleString()}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;




// import { parse } from 'postcss';
// import React from 'react'
// import { useState } from 'react';

// function App() {
//   const[budget,setBudget]=useState("");
//   const[amount,setAmount]=useState("");
//   const[name,setName]=useState("");
//   const[expensesdata,setExpensesData]=useState([]);
//   const[amountspent,setAmountSpent]=useState(0);
//   const[amountremain,setAmountRemain]=useState(0);
//   const[message,setMessage]=useState("");

//  const handleBtn=()=>{
//   if(!budget){
    
//     setMessage("please enter budget amount")
//     return
//   }

//   if(amount && name){

//     let calculateAmountSpent=parseInt(amount) + parseInt(amountspent);
//     setAmountSpent(calculateAmountSpent)

//     let calculateAmountRemain = parseInt(budget)- parseInt(calculateAmountSpent)
//     setAmountRemain(calculateAmountRemain)
//     setName("")
//     setAmount("")
    
//     let details={name, amount}
//     setExpensesData([...expensesdata, details])
    
//   }
//   if( ! name){
    
//     setMessage("please fill name of expense")
    
    
//   }
//   if( ! amount || NaN){
    
    
//     setMessage("please fill cost of expense")
    
//   }



  
//  }


  
//   return (
//   <div>
//       <br />

//       <h1 className='text-lg text-center'>IBB BUDGET APP</h1>
//       <br />

//       <div className='bg-red-600'>{message}</div>
//       <br />
//     <div>
//       <span>BUDGET:</span><input  value={budget} type="number" placeholder='enter your budget' onChange={(e)=>setBudget(e.target.value)} />
//     </div>
    
//     <br />

//     <div className='flex flex-col justify-center w-screen h-56 gap-5 align-middle bg-pink-500 g-pink-500'>
      
//       <h1>ENTER YOUR EXPENSE</h1>

//       <input value={name} type="text" placeholder='enter name of expense' onChange={(e)=>setName(e.target.value)} />
      
//       <input value={amount} type="number" placeholder='enter cost of expense' onChange={(e)=>setAmount(e.target.value)}/>
      
//       <button  className='flex justify-center w-1/2 text-2xl align-middle bg-white border-violet-500 border-5 text-violet-800' onClick={handleBtn}> ADD EXPENSE</button>
//     </div>




//     <div>
                
//       <p> budget: {budget}</p>
//       <p> amountspent: {amountspent}</p>
//       <p> amountremain: {amountremain}</p>

              
//     </div>
    
//      <br />
     
//       <div>
//       <h1>EXPENSES SO FAR:</h1>
    
//         {

//           expensesdata.map((item,i)=>
              
//               <div className='flex gap-5 bg-pink-400' >
//                 <span>{i+1}.</span>
//                 <span>{item.name}</span>
//                 <span>{item.amount}</span>
//               </div>
              
//           )

//         }
//       </div>


   
    
      
//   </div>
    
//   )
// }

// export default App

import React from 'react'
import Testingbudget from './Testingbudget'

function App() {
  return (
    <div>
      
      <Testingbudget/>
      
    </div>
  )
}

export default App












