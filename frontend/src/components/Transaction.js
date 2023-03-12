import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactSwitch from 'react-switch';

export default function Transaction() {
    const navigate = useNavigate();
    const [amount, setUserAmount] = useState("");
    const [description, setDescription] = useState("");
    const [disableBalance, setBalance] = useState(false);
    const [checked, setChecked] = useState(true);
    const [credit, setCredit] = useState('Credit');

    const handleChange = val => {
      if(val){
        setCredit('Credit')
      } else{
        setCredit('Debit')
      }
      setChecked(val)
    }
    const formHandler = async (ev) => {
        const wallet = JSON.parse(localStorage.getItem("walletId"));
        // console.log("walletttttt",JSON.parse(wallet))
        ev.preventDefault();
        if (amount === '' || description === '') {
            alert('Please fill in all fields')
        } else {
            const rawResponse = await fetch(`http://localhost:5000/transact/${wallet}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount, description })
            });
            const content = await rawResponse.json();
            if (rawResponse.status === 200 && Array.isArray(content.trans) && content.trans.length) {
                console.log(content)
                setBalance(true)
                setUserAmount('')
                setDescription('')
                //navigate('/transactions', { replace: true });
            }

        }
    }

    return (
        <div className="project">
            <div className="container">
                <div className="row">
                { disableBalance ?  null :   <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create New Transaction</h5>
                        <hr />
                        <form action="dashboard.html" onSubmit={formHandler}>
                            <div className="form-group">
                                <input type="number" className="form-control form-control-lg" style={{ margin: '1vw' }} placeholder="Amount" name='amount' onChange={ev => { setUserAmount(ev.target.value) }}
                                    value={amount} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" style={{ margin: '1vw' }} placeholder="Description" name='description' onChange={ev => { setDescription(ev.target.value) }}
                                    value={description} />
                            </div>
                            <div className="toggle-switch">
                            <h6>{credit}</h6>
                            <ReactSwitch
                                checked={checked}
                                onChange={handleChange}
                            />
                            </div>
                            <input type="submit" className="btn btn-primary btn-block mt-4" value="Create" />
                        </form>
                    </div> } 

                  
                    { disableBalance ?  <div className="card text-center">
                        <div className="card-header bg-success text-white">
                            <h4>UBL Account Balance</h4>
                            <h1>Rs. 27000</h1>
                        </div>
                    </div> : null }  
                   
                </div>
            </div>
        </div>
    );
}
