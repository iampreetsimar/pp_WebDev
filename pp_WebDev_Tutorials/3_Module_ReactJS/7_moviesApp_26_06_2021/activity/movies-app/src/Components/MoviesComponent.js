/* eslint-disable jsx-a11y/scope */
import React, { Component } from 'react';
// import { getMovies } from './MoviesService';
import axios from 'axios';

export default class MoviesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // we'll use ComponentDidMount to make a network request
            movies: [],
            currSearch: '',
            currPage: 1,
            limit: 4

            // removing it as making a state for a temporary function here is not necessary and efficient
            // filteredMovies: getMovies()
        }
    }

    // since promise will be returned, we'll use async
    async componentDidMount() {
        let result = await axios.get("https://backend-react-movie.herokuapp.com/movies");
        // console.log(result.data.movies);
        this.setState({
            movies: result.data.movies
        })
    }

    handleChange = (e) => {
        let val = e.target.value;
        this.setState({currSearch: val});

        // REASON TO NOT USE TWO STATES FOR MOVIES
        // Removing this change. We created two states for similar content. As filtering movies is temporary and occurs 
        // with the state change of currSearch, we can simply form filteredMovies in render method itself

        // if(val === '') {
        //     this.setState({filteredMovies: this.state.movies, currSearch: ''});
        //     return;
        // }

        // let newFilteredMovies = this.state.movies.filter(movie => {
        //     return movie.title.trim().toLowerCase().includes(val.trim().toLowerCase());
        // });

        // this.setState({filteredMovies: newFilteredMovies, currSearch: val});
    }

    handleLimit = (e) => {
        let val = e.target.value;
        this.setState({limit: val});
    }

    deleteMovie = (id) => {
        let newMovies = this.state.movies.filter(movies => {
            return movies._id !== id;
        });
        this.setState({movies: newMovies});
    }

    sortByRatings = (e) => {
        let classname = e.target.className;
        let sortedMovies = [];

        if(classname === "fas fa-sort-up") {
            // ascending order
            sortedMovies = this.state.movies.sort(function (movieA, movieB) {
                return movieA.dailyRentalRate - movieB.dailyRentalRate;
            });
        } else {
            // descending order
            sortedMovies = this.state.movies.sort(function (movieA, movieB) {
                return movieB.dailyRentalRate - movieA.dailyRentalRate;
            })
        }

        this.setState({movies: sortedMovies});
    }

    sortByStock = (e) => {
        let classname = e.target.className;
        let sortedMovies = [];

        if(classname === "fas fa-sort-up") {
            // ascending order
            sortedMovies = this.state.movies.sort(function (movieA, movieB) {
                return movieA.numberInStock - movieB.numberInStock;
            });
        } else {
            // descending order
            sortedMovies = this.state.movies.sort(function (movieA, movieB) {
                return movieB.numberInStock - movieA.numberInStock;
            })
        }

        this.setState({movies: sortedMovies});
    }

    handlePagination = (page) => {
        this.setState({currPage: page});
    }

    render() {
        let { movies, currSearch, currPage, limit } = this.state;
        let filteredMovies = [];
        
        if(currSearch !== '') {
            filteredMovies = movies.filter(movie => {
                let title = movie.title.trim().toLowerCase();
                return title.includes(currSearch.trim().toLowerCase());
            });
        } else {
            filteredMovies = movies;
        }

        let totalPages = Math.ceil(filteredMovies.length / limit);
        let pageNumbers = [];   // for pagination
        for(let i = 0; i < totalPages; i++) {
            pageNumbers.push(i + 1);
        }

        let si = (currPage - 1) * limit;
        let ei = si + limit;
        filteredMovies = filteredMovies.slice(si, ei);

        // fix for case - one movie on page and delete it
        // if(filteredMovies.length === 0) {
        //     this.setState({currPage: 1});
        // }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h3>All Genres</h3>
                    </div>
                    <div className="col-9">
                        <input type="text" placeholder="Enter movie name" onChange={this.handleChange} value={this.state.currSearch}></input>
                        <label>Show results: </label>
                        <input type="number" onChange={this.handleLimit} value={this.state.limit} min="1" max={this.state.movies.length}></input>

                        {/* Movies Table */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">
                                        Stock
                                        {/* <i className="fas fa-sort"></i> */}
                                        <i onClick={this.sortByStock} className="fas fa-sort-up"></i>
                                        <i onClick={this.sortByStock} className="fas fa-sort-down"></i>
                                    </th>
                                    <th scope="col">
                                        Rate
                                        {/* <i className="fas fa-sort"></i> */}
                                        <i onClick={this.sortByRatings} className="fas fa-sort-up"></i>
                                        <i onClick={this.sortByRatings} className="fas fa-sort-down"></i>
                                    </th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredMovies.map(movie => (
                                        <tr scope="row" key={movie._id}>
                                            <td>{movie.title}</td>
                                            <td>{movie.genre.name}</td>
                                            <td>{movie.numberInStock}</td>
                                            <td>{movie.dailyRentalRate}</td>
                                            <td><button type="button" className="btn btn-danger" onClick={() => this.deleteMovie(movie._id)}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        {/* PAGINATION */}
                        <nav aria-label="...">
                            <ul className="pagination">
                                {
                                    pageNumbers.map((page) => {
                                        let classStyle = page === currPage ? "page-item active" : "page-item";
                                        return (
                                            <li key={page} className={classStyle} onClick={() => this.handlePagination(page)}>
                                                <span className="page-link">{page}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}
