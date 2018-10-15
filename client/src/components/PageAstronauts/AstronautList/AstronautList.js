import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./AstronautList.module.css";

const AstronautList = ({ astronauts, updated }) => (
  <Fragment>
    <h4 className={styles.subHeading}>Astronauts</h4>
    <small className={styles.small}>{`updated: ${updated}`}</small>
    <ul className={styles.list}>
      {astronauts.map(a => (
        <li className={styles.item} key={a.id}>
          <Link className={styles.link} to={`/astronauts/${a.id}`}>{`${
            a.firstName
          } ${a.lastName}`}</Link>
        </li>
      ))}
    </ul>
  </Fragment>
);

AstronautList.propTypes = {
  astronauts: PropTypes.array.isRequired
};

export default AstronautList;