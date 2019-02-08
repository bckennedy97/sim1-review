import React, { Component } from 'react';
import Form from './components/Form/Form';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';
import axios from 'axios';
import Header from './components/Header/Header';
import {connect} from "react-redux";
import {setInventory,addProduct} from "./ducks/reducer";

class App extends Component {
  constructor() {
    super();

    this.state = {
      inventory: [],
      selectedId: null
    }
  }

  // get inventory from database
  componentDidMount() {
    this.fetchInventory();
  }

  fetchInventory = () => {
    axios.get('/api/inventory').then(response => {

      this.props.setInventory(response.data)
      
      // this.setState( {
      //   inventory: response.data
      // })
    })
  } 

  // post to inventory
  addProduct = (name, price, imgurl) => {
    const myProduct = {
      name,
      price,
      imgurl
    }
    axios.post('/api/products', myProduct).then(response => {
      this.props.addProduct(response.data[0]) //addProduct function from reducer with response.data at 0 index of response array
    })
  }

  deleteProduct = (id) => {
    axios.delete(`/api/products/${id}`).then(() => {
      this.fetchInventory();
    })
  }

  selectProduct = (id) => {
    this.setState({
      selectedId : id
    })
  }

//change inventory from this.state.inventory to this.props.inventory (REDUX is props)
  render() {
    return (
      <div className="App">
        <Header />
        <div className='container'>
          <Dashboard inventory={this.props.inventory} deleteProductFn={this.deleteProduct} selectProductFn={this.selectProduct} />
          <Form addProductFn={this.addProduct} 
                selected={this.state.selectedId} 
                selectProductFn={this.selectProduct}
                reset={this.fetchInventory} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    inventory: reduxState.inventory
  }
}
// const mapDispatchToProps = () => {
//   return{
      // setInventory
//   }
// }

export default connect(mapStateToProps,{setInventory,addProduct})(App);
