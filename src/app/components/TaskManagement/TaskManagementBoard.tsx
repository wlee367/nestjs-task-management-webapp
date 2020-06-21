import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import { TaskManagementBoardColumn } from "./TaskManagementBoardColumn";
import { TaskDetailModal } from "../TaskDetailModal/TaskDetailModal";
import { ActivityDrawer } from "../ActivityDrawer/ActivityDrawer";
import {
  moveTodo,
  fetchTodos,
  fetchTodoById,
  ToggleModal,
} from "../../redux/actions";
import { connect, ConnectedProps } from "react-redux";
import { StoreState } from "../../redux/reducers";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
// Create styles board element properties
const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
`;

const BoardTitleBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-bottom: 1em;
`;

type TaskManagementBoardState = {
  doesDetailIdExist: boolean;
  detailId?: string;
};

const mapState = (state: StoreState) => ({
  todos: state.todos.items,
  columns: state.todos.columns,
  columnsOrder: state.todos.columnsOrder,
  selectedTitle: state.todos.selectedTitle,
  selectedDescription: state.todos.selectedDescription,
  selectedId: state.todos.selectedId,
  selectedStatus: state.todos.selectedStatus,
  isOpen: state.todos.isDetailModalOpen,
});

const mapDispatch = {
  moveTodo: (
    todos: any,
    columns: any,
    shouldSave: boolean,
    destinationId: string,
    itemId: string
  ) => moveTodo(todos, columns, shouldSave, destinationId, itemId),
  fetchTodo: () => fetchTodos(),
  fetchTodoById: (id: string) => fetchTodoById(id),
  toggleModal: () => ToggleModal(),
};

const connector = connect(mapState, mapDispatch);

type TaskManagementBoardProps = ConnectedProps<typeof connector> & {
  detailId?: string;
  todos?: object;
  columns?: object;
  columnsOrder?: [];
};

class TaskManagementBoard extends React.Component<
  TaskManagementBoardProps,
  any
> {
  state = {
    isCreateModalOpen: false,
  };

  toggleIsCreateModal = () => {
    this.setState({ isCreateModalOpen: !this.state.isCreateModalOpen });
  };

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return (
      this.props.todos !== nextProps.todos ||
      this.props.columns !== nextProps.columns ||
      this.props.detailId !== nextProps.detailId ||
      this.props.isOpen !== nextProps.isOpen ||
      this.state.isCreateModalOpen !== nextState.isCreateModalOpen
    );
  }

  componentDidMount() {
    if (this.props.detailId !== undefined) {
      this.props.fetchTodoById(this.props.detailId);
    } else {
      this.props.fetchTodo();
    }
  }

  // Handle drag & drop
  onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    // Do nothing if item is dropped outside the list
    if (!destination) {
      return;
    }

    // Do nothing if the item is dropped into the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find column from which the item was dragged from
    const columnStart = (this.props.columns as any)[source.droppableId];

    // Find column in which the item was dropped
    const columnFinish = (this.props.columns as any)[destination.droppableId];

    // Moving items in the same list
    if (columnStart === columnFinish) {
      // Get all item ids in currently active list
      const newItemsIds = Array.from(columnStart.itemIds);

      // Remove the id of dragged item from its original position
      newItemsIds.splice(source.index, 1);

      // Insert the id of dragged item to the new position
      newItemsIds.splice(destination.index, 0, draggableId);

      // Create new, updated, object with data for columns
      const newColumnStart = {
        ...columnStart,
        itemIds: newItemsIds,
      };

      // Create new board state with updated data for columns
      //    todos: state.todos.items,
      // columns: state.todos.columns,
      // columnsOrder: state.todos.columnsOrder
      const newState = {
        todos: this.props.todos,
        columnsOrder: this.props.todos.columnsOrder,
        columns: {
          ...this.props.columns,
          [newColumnStart.id]: newColumnStart,
        },
      };
      // no need to fire an API call here because we're not interested in
      // persisting the order the tasks are in the columns.
      this.props.moveTodo(
        newState.todos,
        newState.columns,
        false,
        columnFinish.id,
        draggableId
      );
    } else {
      // Moving items from one list to another
      // Get all item ids in source list
      const newStartItemsIds = Array.from(columnStart.itemIds);

      // Remove the id of dragged item from its original position
      newStartItemsIds.splice(source.index, 1);

      // Create new, updated, object with data for source column
      const newColumnStart = {
        ...columnStart,
        itemIds: newStartItemsIds,
      };

      // Get all item ids in destination list
      const newFinishItemsIds = Array.from(columnFinish.itemIds);

      // Insert the id of dragged item to the new position in destination list
      newFinishItemsIds.splice(destination.index, 0, draggableId);

      // Create new, updated, object with data for destination column
      const newColumnFinish = {
        ...columnFinish,
        itemIds: newFinishItemsIds,
      };

      // Create new board state with updated data for both, source and destination columns
      const newState = {
        todos: this.props.todos,
        columnsOrder: this.props.todos.columnsOrder,
        columns: {
          ...this.props.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish,
        },
      };

      // Update the board state with new data
      // add true as a shouldSave prop - that way we can distinguish
      // when to fire off api.
      this.props.moveTodo(
        newState.todos,
        newState.columns,
        true,
        columnFinish.id,
        draggableId
      );
    }
  };

  render() {
    return (
      <>
        {this.props.isOpen && (
          <TaskDetailModal
            title={this.props.selectedTitle}
            content={this.props.selectedDescription}
            isOpen={this.props.isOpen}
            toggleModal={() => {
              // this.setState({ isOpen: !this.state.isOpen });
              this.props.toggleModal();
            }}
          />
        )}
        <BoardTitleBar>
          <ActivityDrawer />
        </BoardTitleBar>

        <BoardEl>
          {/* Create context for drag & drop */}
          <DragDropContext onDragEnd={this.onDragEnd}>
            {/* Get all columns in the order specified in 'board-initial-data.ts' */}
            {this.props.columnsOrder.map((columnId: string) => {
              // Get id of the current column
              const column = (this.props.columns as any)[columnId];

              // Get item belonging to the current column
              const items =
                column &&
                column.itemIds.map((itemId: string) => {
                  return Object.values(this.props.todos).filter((item: any) => {
                    return item.id === itemId;
                  })[0];
                });
              // Render the BoardColumn component
              return (
                <TaskManagementBoardColumn
                  key={column.id}
                  column={column}
                  items={items}
                  isCreateModalOpen={this.state.isCreateModalOpen}
                  toggleModal={this.toggleIsCreateModal}
                />
              );
            })}
          </DragDropContext>
          <Fab
            style={{
              margin: 0,
              top: "auto",
              right: 20,
              bottom: 20,
              left: "auto",
              position: "fixed",
            }}
            aria-label={"Add"}
            color={"primary" as "primary"}
            onClick={this.toggleIsCreateModal}
          >
            <AddIcon />
          </Fab>
        </BoardEl>
      </>
    );
  }
}

export default connector(TaskManagementBoard);
