import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
export default function TransactionList() {
  const [transactionList, setTransactionList] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);
  const [pageNumber, setpageNumber] = useState(1);
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);


  const loadDataOnlyOnce = async () => {
    const wallet = JSON.parse(localStorage.getItem("walletId"));
    const rawResponse = await fetch(`http://localhost:5000/transactions?walletId=${wallet}&skip=0&limit=10`, {
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


 const handleNextClick = async () => {
    console.log("Next");
    if (pageNumber + 1 > Math.ceil(transactionCount / 10)) {
    }
    else {
      const wallet = JSON.parse(localStorage.getItem("walletId"));
      const rawResponse = await fetch(`http://localhost:5000/transactions?walletId=${wallet}&skip=${pageNumber*10}&limit=10`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const content = await rawResponse.json();
      console.log("contenttt", content)
        setTransactionList(content.transactionList)
        setpageNumber(pageNumber + 1)
    }
}

const handlePrevClick = async () => {
  console.log("Previous");

  const wallet = JSON.parse(localStorage.getItem("walletId"));
  const rawResponse = await fetch(`http://localhost:5000/transactions?walletId=${wallet}&skip=${(pageNumber-1)*10}&limit=10`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const content = await rawResponse.json();
  console.log("contenttt", content)
    setTransactionList(content.transactionList)
    setpageNumber(pageNumber - 1)

}
  return (
    <div>    <div className="container">
      <Link to="/welcome" className="btn btn-default btn-lg mb-3">
        Back
      </Link>
      <Link to="/transaction" className="btn btn-info btn-lg mb-3">
        <i className="fas fa-plus-circle"> Record new Transaction</i>
      </Link>
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
      <div className="container d-flex justify-content-between">
    <button type="button" class="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
    <button type="button" class="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
</div>
      {/* { <!-- Transactions ENDS HERE --> } */}
    </div></div>
  )

}

