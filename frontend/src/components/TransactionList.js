import React, { useEffect, useState } from 'react'

export default function TransactionList() {
  const [transactionList, setTransactionList] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);


  const loadDataOnlyOnce = async () => {
    const wallet = JSON.parse(localStorage.getItem("walletId"));
    const rawResponse = await fetch(`http://localhost:5000/transactions?walletId=${wallet}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.json();
    console.log("contenttt", content)
    if (rawResponse.status === 200 && Array.isArray(content.transactionList) && content.transactionList.length) {
      console.log(content)
      setTransactionList(content.transactionList)
      setTransactionCount(content.transactionCount)

    }
  }

   const toJSONLocal = (date) => {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }





  return (
    <div>    <div className="container">
      <a href="dashboard.html" className="btn btn-default btn-lg mb-3">
        Back
      </a>
      <a href="newtransactionForm.html" className="btn btn-info btn-lg mb-3">
        <i className="fas fa-plus-circle"> Record new Transaction</i>
      </a>
      <br />
      <div className="card text-center">
        <div className="card-header bg-success text-white">
          <h4>UBL Account Balance</h4>
          <h1>Rs. 27000</h1>
        </div>
      </div>
      <hr />
      {/* { <!-- Transactions STARTS HERE -->} */}
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Amount</th>
            <th scope="col">Description</th>
            <th scope="col">Balance</th>
            <th scope="col">TType</th>
            <th scope="col">TDate</th>
          </tr>
        </thead>
        <tbody>
          {transactionList.length && transactionList.map((object, i) => {
            return (
              <tr className="table" key={i}>
                <td>{object.amount.$numberDecimal}</td>
                <td>{object.description}</td>
                <td>{object.balance.$numberDecimal}</td>
                <td>{object.type}</td>
                <td>{object.createdAt}</td>

              </tr>)
          })}

        </tbody>
      </table>

      {/* { <!-- Transactions ENDS HERE --> } */}
    </div></div>
  )

}

