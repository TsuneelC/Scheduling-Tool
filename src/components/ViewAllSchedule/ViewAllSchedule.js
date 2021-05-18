import React, { useState } from "react";

import { Container, Columns } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { SCHEDULE_CARD_DATA } from "../../mock/ScheduleCardData";
import Pagination from "../Common/Pagination";

const styles = {
  table: {
    width: "100%",
  },
  th: {
    width: "20%",
    textAlign: "center",
  },
  td: {
    height: "30px",
  },
  closeIcon: {
    textAlign: "end",
  },
};

function ViewAllSchedule() {
  return (
    <Container>
      <div style={styles.closeIcon}>
        <button className="button is-white">
          <span>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </button>
      </div>
      <Columns>
        <Columns.Column style={{ alignItems: "center", display: "flex" }}>
          <label style={{ paddingRight: "5px" }}>Jump To Date:</label>

          <div>
            <input className="input" type="date" placeholder="From" />
          </div>
        </Columns.Column>
        <Columns.Column></Columns.Column>
        <Columns.Column>
          <div>
            <Pagination />
          </div>
        </Columns.Column>
      </Columns>
      <div>
        <table className="table is-bordered" style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Timeslot</th>
              <th style={styles.th}>Velocity</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Administered</th>
            </tr>
          </thead>
          <tbody>
            {SCHEDULE_CARD_DATA.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default ViewAllSchedule;
