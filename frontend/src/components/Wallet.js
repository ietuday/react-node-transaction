import React, { useState } from 'react'

export function Wallet() {
    const [userName, setUserName] = useState("");
    const [balance, setbalance] = useState("");

    const formHandler = async (ev) => {
        ev.preventDefault();
        if (userName === '' || balance === '') {
            alert('Please fill in all fields')
        } else {
            const rawResponse = await fetch('http://localhost:5000/setup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: userName, balance })
            });
            const content = await rawResponse.json();
            console.log(content)
            setUserName('')
            setbalance('')
        }
    }

    return (
        <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create Wallet</h5>
                        <hr />
                        <form action="dashboard.html" onSubmit={formHandler}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" style={{ margin: '1vw' }} placeholder="UserName" name='userName' onChange={ev => { setUserName(ev.target.value) }}
                                    value={userName} />
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control form-control-lg" placeholder="Balance" name='balance' onChange={ev => { setbalance(ev.target.value) }}
                                    value={balance} />
                            </div>
                            <input type="submit" className="btn btn-primary btn-block mt-4" value="Create" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
