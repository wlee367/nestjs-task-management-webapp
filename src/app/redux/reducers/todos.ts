import { Action, ActionTypes } from "../actions";

const initialState = {
  //     items: [ {
  //         id: 'item-1',
  //         content: 'Content of item 1.',
  //         title: 'Title1',
  //     },
  // ],
  items: [],
  columns: {
    OPEN: {
      id: "OPEN",
      title: "Open",
      itemIds: [] as string[],
    },
    IN_PROGRESS: {
      id: "IN_PROGRESS",
      title: "In Progress",
      itemIds: [] as string[],
    },
    DONE: {
      id: "DONE",
      title: "Done",
      itemIds: [] as string[],
    },
  },
  columnsOrder: ["OPEN", "IN_PROGRESS", "DONE"],
};

export const todosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.moveTodos:
      return {
        items: action.todos,
        columns: action.columns,
        columnsOrder: state.columnsOrder,
      };
    case ActionTypes.createTodo:
      const newItem = {
        id: action.id,
        content: action.description,
        title: action.title,
      };
      let updatedColumns = state.columns;
      if (action.status === "DONE") {
        updatedColumns["DONE"].itemIds.push(action.id);
      } else if (action.status === "IN_PROGRESS") {
        updatedColumns["IN_PROGRESS"].itemIds.push(action.id);
      } else if (action.status === "OPEN") {
        updatedColumns["OPEN"].itemIds.push(action.id);
      }
      return {
        items: [...state.items, newItem],
        columns: updatedColumns,
        columnsOrder: state.columnsOrder,
      };
    case ActionTypes.fetchTodos:
      const todosFromDb = action.payload;
      let items = [] as object[];
      let newColumns = state.columns;
      todosFromDb &&
        todosFromDb.length > 0 &&
        todosFromDb.map((todoFromDb) => {
          items.push({
            id: todoFromDb.id,
            content: todoFromDb.description,
            title: todoFromDb.title,
            status: todoFromDb.status,
          });
          if (todoFromDb.status === "DONE") {
            newColumns["DONE"].itemIds.push(todoFromDb.id);
            newColumns["DONE"].itemIds = [
              ...Array.from(new Set(newColumns["DONE"].itemIds)),
            ];
          } else if (todoFromDb.status === "IN_PROGRESS") {
            newColumns["IN_PROGRESS"].itemIds.push(todoFromDb.id);
            newColumns["IN_PROGRESS"].itemIds = [
              ...Array.from(new Set(newColumns["IN_PROGRESS"].itemIds)),
            ];
          } else if (todoFromDb.status === "OPEN") {
            newColumns["OPEN"].itemIds.push(todoFromDb.id);
            newColumns["OPEN"].itemIds = [
              ...Array.from(new Set(newColumns["OPEN"].itemIds)),
            ];
          }
        });

      return {
        items: [...items],
        columns: newColumns,
        columnsOrder: state.columnsOrder,
      };
    default:
      return state;
  }
};
