//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.taskId = 0;
        this.state = {
            done: false
        }
    }

    toggle() {
        this.setState({ 
            done: !this.state.done
        })
    }

    render() { 

        if (this.state.done) {
            return (
                <li id={"task" + this.props.id} >
                    <i className="check glyphicon glyphicon-check" onClick={() => this.toggle()} />
                    <span contentEditable="true" className="completed">{this.props.text}</span>
                    <i className="destroy glyphicon glyphicon-remove" onClick={() => this.props.remove()} />
                </li>
            )
        } else {
            return (
                <li id={"task" + this.props.id}>
                    <i className="check glyphicon glyphicon-check" onClick={() => this.toggle()} />
                    <span contentEditable="true">{this.props.text}</span>
                    <i className="destroy glyphicon glyphicon-remove" onClick={() => this.props.remove()} />
                </li>
            )

        }

        /*
        <li>
        {this.props.text}
        </li>
        h("li", { id: `task${_taskId++}`}, [
            h("i", { className: "check glyphicon glyphicon-check", onClick: toggleDone }, []),
            h("span", { contentEditable: true, done: false }, typeof(text) === "string" ? text : ""),
            h("i", { className: "destroy glyphicon glyphicon-remove", onClick: removeTask }, []),
        ])
        */
    }
}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.nextId = 2;
        this.input;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item", done: false},
                {id:1, text:"Another item", done: false}
            ]
        }
    }

    addTodo() {
        this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text:this.input.value}
            ]
        })
    }

    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text, done}) => id != removeId)
        })
    }

    render() { 
        const listItems = this.state.todoItems.map((x) => <ToDoItem key={x.id} text={x.text} done={x.done} remove={() => this.removeTodo(x.id)} />)

        return (
            <div>
                <input id="newTODO" type="text" placeholder="To Do" ref={function(input) {
                    if (input != null) {
                        this.input = input;
                    }
                }.bind(this)} />
                <button onClick={() => this.addTodo() }>Add Item</button>
                <span className="submit">
                    <a href="https://webdev-rice.herokuapp.com" target="_blank">Submit your exercise</a>
                </span>
                <ul className="todo">
                    {listItems}
                </ul>
            </div>
        /*
        <div>
            <ul className="todo">
                <ToDoItem key="1" text="Test Item" remove={() => this.removeTodo(1) } />
            </ul>
        </div>
        */
        // Hint: <input ... ref={ (node) => this.... = node } />
        /*
        h("div", { },
            h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
            h("button", { onClick: addItem }, "Add Item"),
            h("span", { className: "submit" }, [
                h("a", { href: "https://webdev-rice.herokuapp.com",
                     target: "_blank" }, "Submit your exercise"),
            ]),
            h("ul", { className: "todo" }, listItems)
        )
        */
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()
