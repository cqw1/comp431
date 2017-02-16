//
// Inclass Redux ToDo Exercise
// ============================
//
// Your task is to implement the reducer below.
//
// Start this exercise by running the dev server:
//    npm run dev
// then navigate to the page and open the devtools console.
// Try adding a new To Do item.  The console shows
// the previous state, the action, and the new state.
// 
// Your task is to implement the reducer to properly
// update the state.
//
// DO NOT USE MUTATION
// there should be NO assignment operators in your solution.
// 
const Reducer = (state =  {
	nextId: 2,
	todoItems: [
	    {id: 0, text: "This is an item", done: false},
	    {id: 1, text: "Another item", done: false}
	]
}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
            return Object.assign({}, state, {
                nextId: state.nextId + 1,
                todoItems: [
                    ...state.todoItems,
                    {
                        id: state.nextId,
                        text: action.text,
                        done: false
                    }
                ]
            })
		case 'REMOVE_TODO':
            return Object.assign({}, state, {
                nextId: state.nextId,
                todoItems: state.todoItems.filter(function(todo) {
                    if (todo.id == action.id) {
                        return false
                    }

                    return true 
                })
            })
		case 'TOGGLE_TODO':
            return Object.assign({}, state, {
                nextId: state.nextId,
                todoItems: state.todoItems.map(function(todo) {
                    if (todo.id == action.id) {
                        return Object.assign({}, todo, {
                            id: todo.id,
                            text: todo.text,
                            done: !todo.done
                        })
                    }

                    return todo
                })
            })
		default: 
			return state
	}
}

export default Reducer
