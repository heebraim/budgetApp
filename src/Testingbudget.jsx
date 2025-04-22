import React from 'react'
import { useState } from 'react'



function Testingbudget() {

const[budget,setBudget]=useState("")
const[name,setName]=useState("")
const[amount,setAmount]=useState("")
const[amountremain,setAmountRemain]=useState(0)
const[amountspent,setAmountSpent]=useState(0)
const[expensesdata,setExpensesData]=useState([])

const handleclick=()=>{
    
if (!budget || ! name || ! amount)  {
    alert("please fill all fields correctly")
    return
}

if (name && amount) {
    
    let calculateAmountSpent= parseInt(amount) + parseInt(amountspent)
    setAmountSpent(calculateAmountSpent)
    let calculateAmountRemain= parseInt(budget) - parseInt(calculateAmountSpent)
    setAmountRemain(calculateAmountRemain)

    let details= {name, amount}
    setExpensesData([...expensesdata ,details])
    
    setName("")
    setAmount("")
    
}


    
    
}





  return (
    <div>



    <div>   budget: <input value={budget} type="text" placeholder='budget' onChange={(e)=>setBudget(e.target.value)} /></div>


    <div>

    <input type="text"  value={name} placeholder='enter name of expense' onChange={(e)=>setName(e.target.value)}/>
    <input type="text"  value={amount} placeholder='enter amount of expense' onChange={(e)=>setAmount(e.target.value)} />

    <button onClick={handleclick} className='bg-green-600'> ADD EXPENSE</button>
    </div>

    <div>
        
    <h1> budget: {budget}</h1>
    <h1>  amountspent: {amountspent}</h1>
    <h1> amountremain/balance : {amountremain}</h1>

    </div>


    <div>
            {
                expensesdata.map((item,i)=>
                <div className='flex gap-3'>

                    <span>{i+1}.</span>
                    <span>{item.name}</span>
                    <span>{item.amount}</span>
                </div>
                
                
            )
            }
   
        
    </div>













      
    </div>
  )
}

export default Testingbudget
