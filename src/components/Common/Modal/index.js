import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
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


class Modal extends React.Component {
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
            <label className="label">Reactivate Schedule</label>
              
            </header>
            <section className="modal-card-body">
              <div className="field">
               
                <div className="control">
                    Scheduled Dates
                  <input
                    className="input"
                    type="text"
                    placeholder="February 1, 2021"
                  />
                    to
                    <input
                    className="input"
                    type="text"
                    placeholder="February 1, 2021"
                  />
                </div>
                <label className="label">Vaccination Schedules Parameter:</label>
                <p>Days of Operation</p>
              </div>
              <div class="field">
              <Button style={styles.btn}>
                  Mon
                  </Button>
                  <Button style={styles.btn}>
                  Tue
                  </Button>
                  <Button style={styles.btn}>
                  Wed
                  </Button>
                  <Button style={styles.btn}>
                  Thur
                  </Button>
                  <Button style={styles.btn}>
                  Fri
                  </Button>
                  <Button style={styles.btn}>
                  Sat
                  </Button>
                  <Button style={styles.btn}>
                  Sun
                  </Button>
              </div>
              <div className="field">
                <label className="label">Hours of Operation:</label>
                <div className="control">
                  
                  <input
                    className="input"
                    type="text"
                    placeholder="10:00 am"
                  />
                    to
                    <input
                    className="input"
                    type="text"
                    placeholder="11:00 am"
                  />
                </div>
                <label className="label">Vaccination Pace:</label>
                <p>Length of vaccine timeslots</p>
                <Button style={styles.btn}>
                  30 min
                  </Button>
                  <Button style={styles.btn}>
                  60 min
                  </Button>
                  <Button style={styles.btn}>
                 Whole Day
                  </Button>
              </div>
              <div className="field">
                <label className="label">Vaccination Velocity</label>
                <div className="control">
                  Number of vaccines given per timeslot
                  <input
                    className="input"
                    type="text"
                    placeholder="50"
                  />
                   
                </div>
                
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

        <button onClick={this.handleClick} className="button is-info is-outlined" style={{float:'right',width:'275px'}}>
         Edit Location
        </button>
      </div>
    );
  }
}







export default Modal;