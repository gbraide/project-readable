import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SortBy from './SortBy';
import { Posts } from './Posts';
import { fetchAllCategories } from '../reducers/categories';
import { fetchPosts } from '../reducers/posts';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handlePostAdd = this.handlePostAdd.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllCategories();
    this.props.fetchPosts(this.props.match.params.catId);
  }
  handleClick(e) {
    if (e.target.value === 'All') {
      this.props.history.push('/');
    } else {
      this.props.fetchPosts(e.target.value);
      this.props.history.push(`/home/${e.target.value}`);
    }
  }
  handlePostAdd() {
    this.props.history.push('/add-post');
  }
  render() {
    const categoriesList = [];
    if (this.props.categoriesList) {
      this.props.categoriesList.forEach((category) => {
        categoriesList.push(
          <span key={category.name} className="readable-nav-btns">
            <input
              type="button"
              className="btn btn-info"
              onClick={this.handleClick}
              value={category.name}
            />
          </span>,
        );
      });
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <header className="page-header">
              <h1>Readable App</h1>
            </header>
            <nav>
              <form>
                <span className="readable-nav-btns">
                  <input
                    type="button"
                    key="All"
                    className="btn btn-info"
                    onClick={this.handleClick}
                    value="All"
                  />
                </span>
                {categoriesList}
              </form>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="readable-home-body">
              <div className="panel panel-default">
                <section className="panel-body">
                  <SortBy />
                  <button className="btn btn-success btn-xs" onClick={this.handlePostAdd}>
                    Add Post
                  </button>
                  <Posts posts={this.props.posts} sortOrder={this.props.sortBy} />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllCategories: () => fetchAllCategories(),
      fetchPosts: category => fetchPosts(category),
    },
    dispatch,
  );

export default connect(
  state => ({
    categoriesList: state.categories.allCategories,
    sortBy: state.categories.sortBy,
    posts: state.posts.posts,
  }),
  mapDispatchToProps,
)(Home);
