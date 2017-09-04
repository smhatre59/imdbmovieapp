/**
 * Default home page displayed on screen
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RedditList } from './';
import * as actions from './redux/actions';
import { AutoComplete, Button, Layout, Menu, Breadcrumb, Card } from 'antd';
const { Header, Content, Footer } = Layout;
import { Input } from 'antd';
const Search = Input.Search;
import 'antd/dist/antd.css';
import request from 'superagent';

function onSelect(value) {
  console.log('onSelect', value);
}

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state ={
    movieMetaHeadings:{
      ratingTitle:"",
      releaseDate:"",
      description:"",
      buttonVisible: false,
      watchedMoviesTitle:""
    }
  }

  /**
  * [populate search results from apis]
  * @param  event
  */
  handleSearch(event) {
    this.props.actions.fetchRedditReactjsList(event.target.value);
    let movieMetaHeadings = {
      ratingTitle:"IMDB rating",
      releaseDate:"Released On : ",
      description:"Description : ",
      watchedMoviesTitle: "Watched",
      buttonVisible: true
    }
    this.setState({
      movieMetaHeadings
    })
  }

  /**
   * [handleButtonClick to store watched movies in redux store]
   * @param  {[string]} movieTitle
   */
  handleButtonClick(movieTitle){
    this.props.actions.storeWatchedMovies(movieTitle)
  }

  /**
   * [handleRemoveMovie description]
   * @param  event
   */
  handleRemoveMovie(event){
  console.log("event",event);
  }

  render() {
    let movieMetaHeadings = this.state.movieMetaHeadings;
    const movieTitle = this.props.home.movieListData.Title;
    let watchedMovieList = this.props.home.watchedMovieList;
    let movieCardsArray=[];
    if(watchedMovieList.length>0){
      movieCardsArray = watchedMovieList.map(function(item){
        return (
          <li className="movie-li-item">
            <a className="movie-a-item" href="#">
              <Card style={{ width: 150,height:250, border: 0,margin: 10,backgroundColor:'#404040'}} bodyStyle={{ padding: 0,backgroundColor:'#404040',border: 0 }}>
                <div className="custom-image">
                  <img alt="" width="140" height="200" src={item.Poster} />
                </div>
                <div className="custom-card">
                  <p className="movie-title">{item.Title}</p>
                </div>
              </Card>
            </a>
          </li>
        );
        });
    }
    return (
      <div className="home-default-page">
        <Layout>
            <Header style={{ position: 'fixed', width: '100%' }}>
                <div className="title-text">
                  <div className="title-text-container">
                    Movieflix
                  </div>
                  <div className="search-bar">
                    <Input
                      placeholder="Search Movies"
                      style={{ width: 200 }}
                      onChange={event => this.handleSearch(event)}
                    />
                  </div>
                </div>

            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64, backgroundColor: '#404040', height: '100%' }}>
              {
                this.props.home.movieListData.length === 0 ?
                <div></div>
                :
                <div className="movie-content-container">
                  <div className="movie-info-container">
                    <div className="image-container">
                      <Card style={{ width: 150,height:250, border: 0,margin: 10,backgroundColor:'#404040'}} bodyStyle={{ padding: 0,backgroundColor:'#404040',border: 0 }}>
                        <div className="custom-image">
                          <img alt="" width="100%" src={this.props.home.movieListData.Poster} />
                        </div>
                      </Card>
                    </div>

                    <div className="movie-meta-container">
                          <div className="movie-title-container">
                            <p className="movie-title"><b>{this.props.home.movieListData.Title}</b></p>
                          </div>
                          <div className="release-date-container">
                            <p>{movieMetaHeadings.releaseDate} {this.props.home.movieListData.Released}</p>
                          </div>
                          <div className="watched-rating-container">
                            <div className="rating-container">
                                  <div>
                                  <span className="imdb-rating-value">{this.props.home.movieListData.imdbRating}
                                  </span>
                                  <br></br>
                                  <span className="imdb-rating-value">
                                    {movieMetaHeadings.ratingTitle}
                                  </span>
                                  </div>
                            </div>
                            {
                              movieMetaHeadings.buttonVisible === true ?
                              <div className="watched-container">
                                <Button type="danger" onClick={() => this.handleButtonClick(movieTitle)}>Watched</Button>
                              </div>
                              :
                              <div></div>
                            }

                          </div>
                          <div className="movie-description">
                            <p className="description-title">
                              {movieMetaHeadings.description}
                            </p>
                            <p className="description-details">
                              {this.props.home.movieListData.Plot}
                            </p>
                          </div>
                    </div>
                  </div>
                  <div className="watched-movies">
                    <div className= "watched-movies-title-container">
                      <p className= "watched-movies-title">
                        {movieMetaHeadings.watchedMoviesTitle}
                      </p>
                    </div>
                    <div className="movie-list-container">
                      {
                        watchedMovieList.length>0 ?
                        <div>
                          <ul className="movie-ul-list">
                            {movieCardsArray}
                          </ul>
                        </div>
                        :
                        <div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              }
            </Content>
          </Layout>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
