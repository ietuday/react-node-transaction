import React, { Component } from 'react'
import {Link} from 'react-router-dom';
class Welcome extends Component {
  render() {
    return (
      <div>
    <div className="landing">
        <div className="light-overlay landing-inner text-dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">Personal Expense Manager</h1>
                        <p className="lead">
                            Create your account to manage your daily expense and hisab kitab
                        </p>
                        <hr />
                        <div className="col-md-12 text-center">
                        <Link to="/wallet" className="btn btn-lg btn-primary mr-60" style={{'margin': '1vw'}}>
                            Create Wallet
                        </Link>
                        <Link to="/transactions" className="btn btn-lg btn-secondary ml-80">
                            Wallet Transactions 
                        </Link>
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

export default Welcome