import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllCategories } from '../reducers/categories';
import { push } from 'react-router-redux';
import store from '../store';

class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllCategories();
  }
  handleClick(e) {
    if (e.target.value === 'All') {
      store.dispatch(push('/'));
    } else {
      store.dispatch(push(`/home/${e.target.value}`));
    }
  }

  render() {
    const categoriesList = [];
    if (this.props.categoriesList) {
      this.props.categoriesList.forEach((category) => {
        categoriesList.push(
          <span key={category.name}>
            <input type="button" onClick={this.handleClick} value={category.name} />
          </span>,
        );
      });
    }
    return (
      <div>
        <nav>
          <form>
            <h1>Readable App</h1>
            <div>
              <span>
                <b>Categories Menu: </b>
              </span>
              <span>
                <input type="button" key="All" onClick={this.handleClick} value="All" />
              </span>
              {categoriesList}
            </div>
          </form>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllCategories: () => fetchAllCategories(),
    },
    dispatch,
  );

export default connect(
  state => ({ categoriesList: state.categories.allCategories }),
  mapDispatchToProps,
)(NavMenu);
