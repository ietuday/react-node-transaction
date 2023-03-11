import React, { Component } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <div>
            <div className="projects">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">My Wallets</h1>
                    <br />
                    <div className="btn-group">
                        <button type="button" className="btn btn-info btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Create new
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="walletForm.html">Wallet</a>
                          <button disabled className="dropdown-item">Transaction</button>
                        </div>
                      </div>
                    <br />
                    <div className="card text-center">
                        <div className="card-header bg-success text-white">
                            <h4>Current Balance (Total)</h4>
                            <h1>Rs. 27000</h1>
                        </div>
                    </div>
                    <hr />

                    <div className="container">
                        <div className="card card-body bg-light mb-3">
                            <div className="row" >
                                <div className="col-lg-4 col-md-3 col-6">
                                    <h3>UBL Account</h3>
                                    <p>Account Number: 1234-1234-1234-1234</p>
                                </div>
                                <div className="col-lg-4 col-md-3 col-6 text-center">
                                    <h3>Balance</h3>
                                    <h1>Rs. 27000</h1>
                                </div>
                                <div className="col-md-4 col-12 d-lg-block">
                                    <ul className="list-group">
                                        <a href="transactions.html">
                                            <li className="list-group-item board text-success">
                                                <i className="fa fa-flag-checkered pr-1"> View Transactions </i>
                                            </li>
                                        </a>
                                        <a href="walletForm.html">
                                            <li className="list-group-item update text-info">
                                                <i className="fa fa-edit pr-1"> Update Account Info</i>
                                            </li>
                                        </a>
                                        <a href="">
                                            <li className="list-group-item delete text-danger">
                                                <i className="fa fa-minus-circle pr-1"> Delete Account</i>
                                            </li>
                                        </a>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </div>
    )
  }
}

export default Dashboard