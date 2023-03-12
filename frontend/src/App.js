import logo from './logo.svg';
import './App.css';
import Nav from './components/shared/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Welcome';
import {Wallet} from './components/Wallet';
import TransactionList from './components/TransactionList';
import Transaction from './components/Transaction'
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" exact element={<Welcome />} /> 
        <Route path="/wallet" exact element={<Wallet />} />
        <Route path="/transactions" exact element={<TransactionList />} />
        <Route path="/transaction" exact element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
