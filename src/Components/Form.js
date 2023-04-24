import React, { useState } from 'react';
import './Form.css';
function Form({ addTransaction }) {
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const[amount, setAmount] = useState('')


    function handleSubmit(event) {
        event.preventDefault();
        const transaction = { date, description, category, amount }
        
        fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(transaction)
        })
        
            .then((response) => response.json())
            .then((data) => addTransaction(data))
            .catch((error) => console.log(error))
        
        setDate('');
        setDescription('')
        setCategory('')
        setAmount('')
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='form-label'>Date</label>
                <input className='form-input' type='date' value={date} onChange={(event) => setDate(event.target.value)} required />
            </div>
               
            <div className='form-group'>
                <label className='form-label'>Description</label>
                <input className='form-input' type='text' value={description} onChange={(event) => setDescription(event.target.value)} required />
            </div>
            
            <div>
                <label className='form-label'>Category</label>
                <input className='form-input' type='text' value={category} onChange={(event) => setCategory(event.target.value)} required />
            </div>

            <div>
                <label className='form-label'>Amount</label>
                <input className='form-input' type='text' value={amount} onChange={(event) => setAmount(event.target.value)} required />
            </div>
            <button className='form-button' type='submit'>Add Transaction</button>
        </form>
        
    )
}
export default Form;
