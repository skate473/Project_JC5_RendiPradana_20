import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Header extends Component {

  state = {
    data: [],
    namaDepan: '',
    namaBelakang: '',
    status: false
  }

  pindah = () => {
    this.setState({
      state: true
    })
    window.location.reload();
  }

  componentDidMount(){
    var mycookie = cookies.get('userID');
    axios.post('http://localhost:8000/profileuser', {
      idUser: mycookie
    }).then((Response) => {
      var data = Response.data[0];
      this.setState({
        namaDepan: data.nama_depan,
        namaBelakang: data.nama_belakang
      })
    })
  }

  componentWillMount(){
    var mycookie = cookies.get('userID');
    axios.post('http://localhost:8000/jumlahcart', {
      userID: mycookie
    }).then((ambilData) => {
      this.setState({
        data: ambilData.data
      })
    })
  }
  
  render() {

    if(this.state.status){
      <Redirect to ="/logout" />
    }

    const jumlahcart = this.state.data.map((item, index) => {
      var jumlah = item.jumlah;

      return <span className="qty">{jumlah}</span>
    })

    return (
      <div>
        <header>
          <div id="top-header">
            <div className="container">
              <div className="pull-left">
                <span>Welcome to SAMASE - JKT !</span>
              </div>
              <div className="pull-right">
                <ul className="header-top-links">
                  <li><Link to="/profile"><h5>Hi, {this.state.namaDepan}&nbsp;{this.state.namaBelakang}</h5></Link></li>
                  <li><Link to="/logout" ><h5>Logout</h5></Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div id="header">
            <div className="container">
              <div className="pull-left">
                <div className="header-logo">
                  <Link to="/" className="logo">
                    <img src="img/logo.png" alt="Logo My Brand" />
                  </Link>
                </div>
              </div>
              <div className="pull-right">
                <div className="header-account">
                  <Link to="/cart" className="cart">
                    <li className="dropdown">
                      <div href="#">
                        <div className="header-btn-icon">
                          <i className="fa fa-shopping-cart" />
                          {jumlahcart}
                        </div>
                      </div>
                    </li>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
