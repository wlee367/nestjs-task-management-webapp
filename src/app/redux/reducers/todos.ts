import { Action, ActionTypes, Comment } from "../actions";
const initialState = {
  selectedTitle: "",
  selectedDescription: "",
  selectedId: "",
  selectedStatus: "",
  isDetailModalOpen: false,
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
  comments: [] as Comment[],
};

export const todosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "CREATE_COMMENT":
      let newComments = [...state.comments];
      newComments.push(action.payload);
      return {
        ...state,
        comments: newComments,
      };
    case ActionTypes.toggleModal:
      return {
        ...state,
        isDetailModalOpen: !state.isDetailModalOpen,
      };
    case ActionTypes.moveTodos:
      return {
        ...state,
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
        ...state,
        items: [...state.items, newItem],
        columns: updatedColumns,
        columnsOrder: state.columnsOrder,
      };
    case ActionTypes.fetchTodoById:
      return {
        ...state,
        selectedTitle: action.payload.title,
        selectedDescription: action.payload.description,
        selectedId: action.payload.id,
        selectedStatus: action.payload.status,
        comments: action.payload.comment,
        isDetailModalOpen: true,
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
        ...state,
        items: [...items],
        columns: newColumns,
        columnsOrder: state.columnsOrder,
      };
    default:
      return state;
  }
};
