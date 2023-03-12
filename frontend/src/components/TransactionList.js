import React, { useEffect, useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { Link } from 'react-router-dom';
export default function TransactionList() {
  const [transactionList, setTransactionList] = useState([]);
  const [fullTransactionList, setFullTransactionList] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);
  const [pageNumber, setpageNumber] = useState(1);
  const [order, setOrder] = useState("ASC")
  useEffect(() => {
    loadDataOnlyOnce();
    loadTransactionList()
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
  const loadTransactionList = async () => {
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
      setFullTransactionList(content.transactionList)
      

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
      const rawResponse = await fetch(`http://localhost:5000/transactions?walletId=${wallet}&skip=${pageNumber * 10}&limit=10`, {
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

  const sorting = async (col) => {
    console.log("inside sorting")
    console.log("coll", col)
    if (order === 'ASC') {
      const sorted = [...transactionList].sort((a, b) =>
        a[col].$numberDecimal - b[col].$numberDecimal
      );
      setTransactionList(sorted)
      setOrder("DSEC")
    } else {
      const sorted = [...transactionList].sort((a, b) =>
        b[col].$numberDecimal - a[col].$numberDecimal
      );
      setTransactionList(sorted)
      setOrder("ASC")
    }
  }

  const dateSort = async (col) => {
    console.log("inside sorting")
    console.log("coll", col)
    if (order === 'ASC') {
      const sorted = [...transactionList].sort((a, b) =>
      new Date(a[col]) - new Date(b[col])
      );
      setTransactionList(sorted)
      setOrder("DSEC")
    } else {
      const sorted = [...transactionList].sort((a, b) =>
      new Date(b[col]) - new Date(a[col])
      );
      setTransactionList(sorted)
      setOrder("ASC")
    }
  }

  const handlePrevClick = async () => {
    console.log("Previous");

    const wallet = JSON.parse(localStorage.getItem("walletId"));
    const rawResponse = await fetch(`http://localhost:5000/transactions?walletId=${wallet}&skip=${(pageNumber - 1) * 10}&limit=10`, {
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



  const downloadCSV = async () => {
    console.log("Previous");

    const wallet = JSON.parse(localStorage.getItem("walletId"));
    const rawResponse = await fetch(`http://localhost:5000/transactions?walletId=${wallet}&skip=${(pageNumber - 1) * 10}&limit=10`, {
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
      <Link to="/welcome" className="btn btn-default btn-lg mb-3" style={{'margin': '1vw'}}>
        Back
      </Link>
      <Link to="/transaction" className="btn btn-info btn-lg mb-3" style={{'margin': '1vw'}}>
        <i className="fas fa-plus-circle"> Record new Transaction</i>
      </Link>
      <button type="button" className="btn btn-info btn-lg mb-3" style={{'margin': '1vw'}}><CSVLink data={fullTransactionList}  filename={`Transactions.csv`}>Download</CSVLink></button>
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
            <th scope="col"><i onClick={() => sorting("balance")} class="fa fa-fw fa-sort"></i>Balance</th>
            <th scope="col">TType</th>
            <th scope="col"><i onClick={() => dateSort("createdAt")} class="fa fa-fw fa-sort"></i>TDate</th>
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
        <button type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div>
      {/* { <!-- Transactions ENDS HERE --> } */}
    </div></div>
  )

}

