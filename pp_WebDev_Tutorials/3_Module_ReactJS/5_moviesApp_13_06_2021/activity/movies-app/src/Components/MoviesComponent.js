/* eslint-disable jsx-a11y/scope */
import React, { Component } from 'react';
import { getMovies } from './MoviesService';

export default class MoviesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: getMovies(),
            currSearch: ''

            // removing it as making a state for a temporary function here is not necessary and efficient
            // filteredMovies: getMovies()
        }
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

    deleteMovie = (id) => {
        let newMovies = this.state.movies.filter(movies => {
            return movies._id !== id;
        });
        this.setState({movies: newMovies});
    }

    render() {
        let {movies, currSearch} = this.state;
        let filteredMovies = [];
        
        if(currSearch !== '') {
            filteredMovies = movies.filter(movie => {
                let title = movie.title.trim().toLowerCase();
                return title.includes(currSearch.trim().toLowerCase());
            });
        } else {
            filteredMovies = movies;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h3>All Genres</h3>
                    </div>
                    <div className="col-9">
                        <input type="text" placeholder="Enter movie name" onChange={this.handleChange} value={this.state.currSearch}></input>

                        {/* Movies Table */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Rate</th>
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
                    </div>
                </div>
            </div>
        )
    }
}
