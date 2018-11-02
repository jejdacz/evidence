import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadAstronaut,
  //loadAstronautFromStore,
  updateAstronaut,
  resetAstronautAction
} from "../../astronautActions.js";
import {
  openDeleteDialogAction,
  closeDeleteDialogAction
} from "../../deleteDialogActions.js";
import Spinner from "../Spinner/Spinner";
import { Nav, Logo, Link } from "../Nav/Nav";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import Button from "../Button/Button";
import DeleteAstronautDialog from "../DeleteAstronautDialog/DeleteAstronautDialog";
import styles from "./PageAstronaut.module.css";

class PageAstronaut extends Component {
  constructor(props) {
    super(props);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadAstronaut({ id: this.props.match.params.id }));

    /*this.props.dispatch(
      loadAstronautFromStore({ id: this.props.match.params.id })
    );*/
    // store is cleared when refreshing the page ...
  }

  componentWillUnmount() {
    this.props.dispatch(resetAstronautAction());
  }

  componentDidUpdate() {
    if (this.props.deleteAstronaut && this.props.deleteAstronaut.success) {
      this.props.dispatch(closeDeleteDialogAction());
      this.props.dispatch(resetAstronautAction());
      this.props.history.push("/");
    }
  }

  openDeleteDialog() {
    this.props.dispatch(openDeleteDialogAction(this.props.astronaut));
  }

  renderContent = content => (
    <Fragment>
      <header>
        <Nav fixed={true}>
          <Logo to="/">ar</Logo>
          <Link to={`/astronauts/edit/${this.props.match.params.id}`}>
            EDIT
          </Link>
          <Link onClick={this.openDeleteDialog}>DELETE</Link>
        </Nav>
      </header>
      <main className={styles.main}>{content}</main>
      <Footer />
    </Fragment>
  );

  render() {
    const { loadAstronaut, deleteAstronaut, astronaut } = this.props;

    if (!loadAstronaut) return null;

    if (loadAstronaut.request) {
      return this.renderContent(<Spinner center={true} />);
    }

    if (loadAstronaut.error) {
      return this.renderContent("Error: Loading of astronaut failed!");
    }

    if (loadAstronaut.success) {
      return this.renderContent(
        <Container className={styles.container}>
          <h1 className={styles.heading}>{`${astronaut.firstName} ${
            astronaut.lastName
          }`}</h1>
          <small className={styles.label}>BIRTH:</small>
          <h4 className={styles.data}>{astronaut.birth}</h4>
          <small className={styles.label}>SUPERPOWER:</small>
          <h4 className={styles.data}>{astronaut.superpower}</h4>
          <div className={styles.controls}>
            <Button
              to={`/astronauts/edit/${this.props.match.params.id}`}
              noBorder={true}
            >
              EDIT
            </Button>
            <Button onClick={this.openDeleteDialog} noBorder={true}>
              DELETE
            </Button>
          </div>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  loadAstronaut: state.loadAstronaut,
  deleteAstronaut: state.deleteAstronaut,
  astronaut: state.activeAstronaut
});

export default connect(mapStateToProps)(PageAstronaut);
