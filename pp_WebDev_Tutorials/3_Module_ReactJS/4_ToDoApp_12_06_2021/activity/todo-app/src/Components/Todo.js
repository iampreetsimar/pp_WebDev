/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasklist: [{id:1, text: 'Task 1'}, {id:2, text: 'Task 2'}, {id:3, text: 'Task 3'}]
        }
    }

    addTask = (taskVal) => {
        // use destructuring to create a new copy of tasklist
        // so that changes are reflected in DOM
        let newlist = [...this.state.tasklist, {id: this.state.tasklist.length + 1, text: taskVal}];
        this.setState({tasklist: newlist});
    }

    deleteTask = (id) => {
        // id is passed from arrow function
        // this is equal to the outer this
        let newlist = this.state.tasklist.filter(task => {
            return task.id !== id;
        });
        this.setState({tasklist: newlist});
    }

    render() {
        console.log("Todo render");
        return (
            <>
                <InputComponent addTask={this.addTask} />
                <TasklistComponent tasklist={this.state.tasklist} deleteTask={this.deleteTask} />
            </>
        )
    }
}

// cannot export two defaults
class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTask: ''
        }
    }

    handleChange = (e) => {
        this.setState({currentTask: e.target.value});
    }

    render() {
        console.log("Input render");
        return (
            <div className="input-container">
                <input value={this.state.currentTask} onChange={this.handleChange} type="text"></input>
                <button onClick={() => {
                    this.props.addTask(this.state.currentTask);
                    this.setState({currentTask: ''})
                }}>Add task</button>
            </div>
        )
    }
}

class TasklistComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("Tasklist render");
        return (
            <div className="task-list">
                <ul>
                    {this.props.tasklist.map(task => (
                        <li key={task.id}>
                            <h2>{task.text}</h2>
                            <button onClick={() => this.props.deleteTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

