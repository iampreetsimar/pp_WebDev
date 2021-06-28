import React, { Component } from 'react'

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasklist: [{id:1, text: 'Task 1'}, {id:2, text: 'Task 2'}, {id:3, text: 'Task 3'}],
            currentTask: ''
        }
    }

    handleChange = (e) => {
        let taskText = e.target.value;
        this.setState({currentTask: taskText});
    }

    addTask = () => {
        // use destructuring to create a new copy of tasklist
        // so that changes are reflected in DOM
        let newlist = [...this.state.tasklist, {id: this.state.tasklist.length + 1, text: this.state.currentTask}];
        this.setState({tasklist: newlist, currentTask: ''});
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
        return (
            <>
                <InputComponent value={this.state.currentTask} handleChange={this.handleChange} addTask={this.addTask} />
                <TasklistComponent tasklist={this.state.tasklist} deleteTask={this.deleteTask} />
            </>
        )
    }
}

// cannot export two defaults
class InputComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="input-container">
                <input value={this.props.value} onChange={this.props.handleChange} type="text"></input>
                <button onClick={this.props.addTask}>Add task</button>
            </div>
        )
    }
}

class TasklistComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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

