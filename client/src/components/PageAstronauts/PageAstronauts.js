import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadAstronautsIfNeeded } from "../../astronautActions.js";
import AstronautList from "./AstronautList/AstronautList.js";
import AstronautTable from "./AstronautTable/AstronautTable.js";
import { Nav, Link, Logo } from "../Nav/Nav.js";
import Hero from "./Hero/Hero.js";
import SectionDatabase from "./SectionDatabase/SectionDatabase.js";
import Footer from "../Footer/Footer.js";
import DeleteAstronautModal from "../DeleteAstronautModal/DeleteAstronautModal.js";
import widthMonitor from "../widthMonitor/widthMonitor.js";
import breakpoints from "../../styles/breakpoints.module.css";
import styles from "./PageAstronauts.module.css";

class PageAstronauts extends Component {
  constructor(props) {
    super(props);

    this.breakpointLarge = breakpoints["bp-lg"].replace("px", "");

    this.state = {
      deleteModalIsOpen: false,
      idToDelete: null
    };

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ deleteModalIsOpen: true });
  }

  closeModal() {
    this.setState({ deleteModalIsOpen: false });
  }

  isLargeScreenDevice() {
    return this.props.width >= this.breakpointLarge;
  }

  handleDeleteClick(id) {
    this.setState({
      idToDelete: id
    });
    this.openModal();
  }

  componentDidMount() {
    this.props.dispatch(loadAstronautsIfNeeded);
  }

  componentWillUnmount() {}

  renderError(error) {
    return <h4>{error.message}</h4>;
  }

  renderLoading() {
    return <h4>loading...</h4>;
  }

  renderContent = content => (
    <Fragment>
      <header className={styles.header}>
        <Nav fixed={true}>
          <Logo to="/">ar</Logo>
          <Link to="/astronauts/new/">+add</Link>
        </Nav>
        <Hero />
      </header>
      <main>
        <SectionDatabase>{content}</SectionDatabase>
      </main>
      <Footer />
      {this.state.deleteModalIsOpen && (
        <DeleteAstronautModal
          isOpen={this.state.deleteModalIsOpen}
          closeModal={this.closeModal}
          idToDelete={this.state.idToDelete}
        />
      )}
    </Fragment>
  );

  render() {
    const { loading, error, items } = this.props;

    if (error) {
      return this.renderContent(this.renderError(error));
    }
    if (loading) {
      return this.renderContent(this.renderLoading());
    }
    if (this.isLargeScreenDevice()) {
      return this.renderContent(
        <AstronautTable
          astronauts={items}
          updated={this.props.receivedAt}
          onDeleteClick={this.handleDeleteClick}
        />
      );
    }
    return this.renderContent(
      <AstronautList astronauts={items} updated={this.props.receivedAt} />
    );
  }
}

const mapStateToProps = state => ({ ...state.astronauts });

export default connect(mapStateToProps)(widthMonitor()(PageAstronauts));
