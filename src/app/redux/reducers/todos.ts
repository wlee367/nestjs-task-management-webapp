import { Action, ActionTypes } from '../actions';

const initialState = {
    //     items: [ {
    //         id: 'item-1',
    //         content: 'Content of item 1.',
    //         title: 'Title1',
    //     },
    // ],
    items: [],
        columns: {
            'OPEN': {
                id: 'OPEN', 
                title: 'Open',
                itemIds: [] as string[]
            },
            'IN-PROGRESS': {
                id: 'IN-PROGRESS',
                title: 'In Progress',
                itemIds: [] as string[],
            },
            'DONE': {
                id: 'DONE',
                title: 'Done',
                itemIds: [] as string[],
            },
       },
       columnsOrder: ['OPEN', 'IN-PROGRESS', 'DONE']
}

export const todosReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.moveTodos:
            return {
                items: action.todos,
                columns: action.columns
            }
        case ActionTypes.createTodo:
            const newItem = {
                id: action.id,
                content: action.description,
                title: action.title
            }
            let updatedColumns = state.columns;
            if(action.status === 'DONE'){
                updatedColumns["DONE"].itemIds.push(action.id);
            } else if(action.status === 'IN-PROGRESS') {
                updatedColumns["IN-PROGRESS"].itemIds.push(action.id);
            } else if(action.status === 'OPEN'){
                updatedColumns["OPEN"].itemIds.push(action.id);
            }

            console.log(updatedColumns)
            return {
                items: [...state.items, newItem],
                columns: updatedColumns,
                columnsOrder: state.columnsOrder
            }
        default:
            return state;
    }
};
