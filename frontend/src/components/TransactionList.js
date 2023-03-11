import React, { Component } from 'react'

class TransactionList extends Component {
  render() {
    return (
      <div>    <div class="container">
      <a href="dashboard.html" class="btn btn-default btn-lg mb-3">
          Back
      </a>
      <a href="newtransactionForm.html" class="btn btn-info btn-lg mb-3">
          <i class="fas fa-plus-circle"> Record new Transaction</i>
      </a>
      <br />
      <div class="card text-center">
          <div class="card-header bg-success text-white">
              <h4>UBL Account Balance</h4>
              <h1>Rs. 27000</h1>
          </div>
      </div>
      <hr />
     {/* { <!-- Transactions STARTS HERE -->} */}
      <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-danger">
              <td>2020-04-15</td>
              <td>PTCL Bill</td>
              <td class="text-danger">-3000</td>
              <td>
                  <a class="text-info" href="updatetransactionForm.html"><i class="fas fa-edit fa-2x"></i></a> 
                  <span class="text-danger"><i class="fas fa-trash fa-2x"></i></span>
              </td>
            </tr>
            <tr class="table-success">
              <td>2020-04-01</td>
              <td>Income</td>
              <td class="text-success">+30000</td>
              <td>
                  <a class="text-info" href="updatetransactionForm.html"><i class="fas fa-edit fa-2x"></i></a> 
                  <span class="text-danger"><i class="fas fa-trash fa-2x"></i></span>
              </td>
            </tr>
          </tbody>
        </table>

     {/* { <!-- Transactions ENDS HERE --> } */}
  </div></div>
    )
  }
}

export default TransactionList