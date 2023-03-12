import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';



export default function Transaction() {
    const navigate = useNavigate();
    const [amount, setUserAmount] = useState("");
    const [description, setDescription] = useState("");
    const [disableBalance, setBalance] = useState(false);
    const [balance, setWalletBalance] = useState(0);
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
                setWalletBalance(content.trans[0].balance.$numberDecimal)
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
                                <input type="number" className="form-control form-control-lg" style={{ margin: '1vw' }} placeholder="amount" name='amount' onChange={ev => { setUserAmount(ev.target.value) }}
                                    value={amount} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" style={{ margin: '1vw' }} placeholder="description" name='description' onChange={ev => { setDescription(ev.target.value) }}
                                    value={description} />
                            </div>
                            <div className="toggle-switch">
                                <input type="checkbox" className="toggle-switch-checkbox-xl" name="toggleSwitch" id="toggleSwitch" />
                                <label className="toggle-switch-label" for="toggleSwitch">
                                    Toggle Me!
                                </label>
                            </div>
                            <input type="submit" className="btn btn-primary btn-block mt-4" value="Create" />
                        </form>
                    </div> } 

                  
                    { disableBalance ?  <div className="card text-center">
                        <div className="card-header bg-success text-white">
                            <h4>Transaction Done Successfully!</h4>
                            <h5>Wallet Available Balance</h5>
                            <h5>Rs. {balance}/-</h5>
                        </div>
                        <hr></hr>
                        <Link to="/transactions" className="btn btn-dark">Go To TransactionList &rarr;</Link>
                    </div>  
                    : null }  
                   
                </div>
            </div>
        </div>
    );
}
