import React, {useState, useEffect} from 'react'
import Form from "./Components/Form";
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch]=useState('')

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then((response) => response.json())
      //.then((data)=>console.log(data))
      .then((data) => setTransactions(data))
    .catch((error)=>console.log(error))
  }, [])

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction])
  };

  const filterTransaction = transactions.filter((transaction)=>transaction.description.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className='App'>
      {/* Search bar to filter transactions. */}
        <div>
          <input className='input'
            type='text'
          placeholder='Search here...'
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
        <button className='my-btn'  onClick={()=>setSearch(search)}>Search</button>
      </div>
      
      {/* Display the transaction in a table */}
      <table className='table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filterTransaction.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
        

      <Form addTransaction={addTransaction} />
      </div>
    )
 }

 export default App;
