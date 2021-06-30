/* eslint-disable jsx-a11y/scope */
import React, { Component } from 'react';
import { getMovies } from './MoviesService';

export default class MoviesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: getMovies()
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h3>All Genres</h3>
                    </div>
                    <div className="col-9">
                        <input type="text" placeholder="Enter movie name"></input>

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
                                    this.state.movies.map(movie => (
                                        <tr scope="row" key={movie._id}>
                                            <td>{movie.title}</td>
                                            <td>{movie.genre.name}</td>
                                            <td>{movie.numberInStock}</td>
                                            <td>{movie.dailyRentalRate}</td>
                                            <td><button type="button" className="btn btn-danger">Delete</button></td>
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
