import React, { useState } from 'react';
import  { useNavigate} from 'react-router-dom';



export default function Transaction() {
    const navigate = useNavigate();
    const [amount, setUserAmount] = useState("");
    const [description, setDescription] = useState("");

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
            if(rawResponse.status === 200 && Array.isArray(content.trans) && content.trans.length){
                console.log(content)
               
                setUserAmount('')
                setDescription('')
                navigate('/transactions', { replace: true });
            }
            
        }
    }

    return (
        <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create New Transaction</h5>
                        <hr />
                        <form action="dashboard.html" onSubmit={formHandler}>
                            <div className="form-group">
                                <input type="number" className="form-control form-control-lg" style={{ margin: '1vw' }} placeholder="amount" name='amount' onChange={ev => { setUserAmount(ev.target.value) }}
                                    value={amount} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" style={{ margin: '1vw' }} placeholder="description" name='description' onChange={ev => { setDescription(ev.target.value) }}
                                    value={description } />
                            </div>
                            <input type="submit" className="btn btn-primary btn-block mt-4" value="Create" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
