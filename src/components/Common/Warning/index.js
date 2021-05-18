import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import { Link } from "react-router-dom";
import "./styles.css";

import { Container, Heading, Columns, Button, Media, Image, Content, Level, Icon } from "react-bulma-components";


const styles = {
  
    btn: {
        color:'#005ca6',
        border:'solid 1px #005ca6',
        marginTop:'13px',
        marginRight:'5px'
    },
}


class Warning extends React.Component {
  state = {
    isModal: false
  };

  handleClick = () => {
    this.setState({ isModal: !this.state.isModal });
  };

  render() {
    const active = this.state.isModal ? "is-active" : "";
    return (
      <div className="Modal">
        <div className={`modal ${active}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
            <label className="label">Warning</label>
              
            </header>
            <section className="modal-card-body">
              <div className="field">
               
               
               
                <p>Are you sure you want to <strong>deactivate</strong> this location's schedule?
                <br/>
                <i>It will close all unused vaccine appointment slots</i>.

                </p>
              </div>
             
             
             
            </section>
            <footer className="modal-card-foot">
              <button className="button is-info" style={{width:'120px'}}>Yes</button>
              <button onClick={this.handleClick} className="button is-info is-outlined">
                Cancel
              </button>
            </footer>
          </div>
        </div>

        <Link onClick={this.handleClick}  style={{float:'right',paddingRight:'2rem'}}>
         Deactivate Schedule
        </Link>
      </div>
    );
  }
}







export default Warning;