import React, { Component } from 'react';

import './App.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {qty:0};
    this.add = this.add.bind(this);
    this.show = this.show.bind(this);
    this.less = this.less.bind(this);

  }

  add() {
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price); 
  }

  show() {
    this.props.handleShow(this.props.name);
    this.props.handleShow(this.props.image);
    }
  
  less() {
    this.setState({qty: this.state.qty - 1});
    this.props.handleTotal(-this.props.price); 
  }






  render() {
    return (
      
 
      
      <h3>Php {this.state.qty*this.props.price}</h3>
  
      <hr/>  
       <p>{this.props.name} = Php {this.props.price}</p>
     <h3>{this.state.qty}</h3>
     
     <button className="btn btn-primary" onClick={this.less}>-</button>
          
     <button className="btn btn-primary" onClick={this.add}>+</button>
            
            
   );
  }
}


class Total extends Component {
  render() {
    return (
    <div>
    <h3>Total Amount Due: Php {this.props.total}</h3> 
    </div>
   )

  }
}

class MenuForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    }
    submit(e){
    e.preventDefault();
    var menu = {
      name:this.refs.name.value,
      price:parseInt(this.refs.price.value
    )};
    this.props.handleCreate(menu);
    //alert(menu.name+ "has been added");
    this.refs.name.value='';
    this.refs.name.value='';
 }

  render() {
    return(
      <form onSubmit={this.submit} class="form-group">
     <div className="container">
     <div className="row">
     <div className="col-lg-4">
      <input className="form-control" type="text" placeholder="Menu Name" ref="name"/>
     </div>
        <div className="col-lg-4">
      <input className="form-control" type="text" placeholder="Menu Price" ref="price"/>
       </div>

<div className="col-lg-4">
      <button className="btn btn-primary">Add Menu</button>
      </div>
      </div>
      </div>
      </form>
      );
    }
}


class MenuList extends Component {

    constructor(props) {
      super(props);
      this.state={total:0,
         menuList: [{name:"Buteteng Tugak", price: 50.00, img_id: "00" },
                  {name:"Abuos", price: 60.00, img_id: "01"},
                  {name:"Ginataang Kuhol", price: 70.00, img_id: "02"},
                  {name:"Adobong Salagubang", price: 80.00, img_id: "03"},
                  {name:"Pinawikang Kabayo", price: 90.00, img_id: "04"}]
     };
      this.calcTotal = this.calcTotal.bind(this);
      this.createMenu = this.createMenu.bind(this);
    }

    calcTotal(price) {
      this.setState({total: this.state.total + price})
    }

  showMenu(name) {
     alert("Your Order: "  +name);
 }

    createMenu(menu) {
    this.setState({
      menuList: this.state.menuList.concat(menu)
    });
   }

  

  render() {
    var component = this;
    var menus = this.state.menuList.map(
      function(men){
    return(
        <Menu name={men.name}
        price={men.price}
        handleShow={component.showMenu}
        handleTotal={component.calcTotal}
        img_id = {men.img_id}
        />
      );
    });  
    

    return(
      <div>
        <MenuForm handleCreate={this.createMenu}/>
       {menus}
       <Total total={this.state.total}/>
       </div>
     )    
  }  
}







export default MenuList;