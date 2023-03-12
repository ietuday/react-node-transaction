import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'


import ReactSwitch from 'react-switch';

export default function Transaction() {
    // const navigate = useNavigate();
    const [amount, setUserAmount] = useState("");
    const [description, setDescription] = useState("");
    const [disableBalance, setBalance] = useState(false);
    const [balance, setWalletBalance] = useState(0);
    const [checked, setChecked] = useState(true);
    const [errorAmount, setErrorAmount] = useState('');
    const [errorDescription, setErrorDescription] = useState('');
    const [credit, setCredit] = useState('Credit');


    const handleChange = val => {
        if (val) {
            setCredit('Credit')
        } else {
            setCredit('Debit')
        }
        setChecked(val)
    }
    const formHandler = async (ev) => {
        const wallet = JSON.parse(localStorage.getItem("walletId"));
        ev.preventDefault();
        setErrorAmount('');
        setErrorDescription('');
        if (amount === '') {
            setErrorAmount('Amount is required')
        } else if (description === '') {
            setErrorDescription('description is required')
        } else if (parseInt(amount, 10) <= 0) {
            setErrorAmount('Amount must be greater than zero')
        } else {
            let amountData = Math.abs(amount)
            if (credit === 'Debit') {
                amountData = -Math.abs(amount)
            }
            console.log(amount, description)
            const rawResponse = await fetch(`http://localhost:5000/transact/${wallet}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: amountData, description })
            });
            const content = await rawResponse.json();
            if (rawResponse.status !== 200 && Array.isArray(content.trans) && content.trans.length) {
                console.log(content)
                setBalance(true)
                setUserAmount('')
                setDescription('')
                setWalletBalance(content.trans[0].balance.$numberDecimal)
                //navigate('/transactions', { replace: true });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
            }

        }
    }

    return (
        <div className="project">
            <div className="container">
                <div className="row">
                    {disableBalance ? null : <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create New Transaction</h5>
                        <hr />
                        <form action="dashboard.html" onSubmit={formHandler}>
                            <div className="form-group">
                                <input type="number" className="form-control form-control-lg" style={{ margin: '1vw' }} placeholder="Amount" name='amount' onChange={ev => { setUserAmount(ev.target.value) }}
                                    value={amount} />
                                <span className="text-danger"> {errorAmount}</span>

                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" style={{ margin: '1vw' }} placeholder="Description" name='description' onChange={ev => { setDescription(ev.target.value) }}
                                    value={description} />
                                <span className="text-danger"> {errorDescription}</span>


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
                    </div>}


                    {disableBalance ? <div className="card text-center">
                        <div className="card-header bg-success text-white">
                            <h4>Transaction Done Successfully!</h4>
                            <h5>Wallet Available Balance</h5>
                            <h5>Rs. {balance}/-</h5>
                        </div>
                        <hr></hr>
                        <Link to="/transactions" className="btn btn-dark">Go To TransactionList &rarr;</Link>
                    </div>
                        : null}

                </div>
            </div>
        </div>
    );
}
