import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { TaskManagementBoardColumn } from './TaskManagementBoardColumn';
import { TaskDetailModal } from '../TaskDetailModal/TaskDetailModal';
import { ActivityDrawer } from '../ActivityDrawer/ActivityDrawer';
import { moveTodo } from '../../redux/actions';
import { connect, ConnectedProps } from 'react-redux'
import { StoreState } from '../../redux/reducers';

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
    justify-content: space-between;
    padding-bottom: 1em;
`;


type TaskManagementBoardState = {
    doesDetailIdExist: boolean;
    detailId?: string;
};

const mapState = (state: StoreState) => ({
    todos: state.todos.items,
    columns: state.todos.columns,
    columnsOrder: state.todos.columnsOrder
})

const mapDispatch = {
    moveTodo: (todos: any, columns: any, shouldSave: boolean) => moveTodo(todos, columns, shouldSave)
}

const connector = connect(mapState, mapDispatch)

type TaskManagementBoardProps = ConnectedProps<typeof connector> & {
    detailId?: string;
    todos? : object;
    columns? : object;
    columnsOrder? : [];
};


class TaskManagementBoard extends React.Component<
    TaskManagementBoardProps,
    any
> {
    // Initialize board state with board data
    state = {
        isOpen: false,
        title: '',
        content: '',
        id: '',
    };

    shouldComponentUpdate(nextProps: any, nextState: any){
        return this.props.todos !== nextProps.todos || this.props.columns !== nextProps.columns || this.props.detailId !== nextProps.detailId;
    }


    componentDidMount() {
        if (this.props.detailId) {
            const itemToShow: any = Object.values(this.props.todos).filter(
                (item: any) => {
                    return item.id === this.props.detailId;
                }
            );

            if (itemToShow && itemToShow.length > 0) {
                this.setState({
                    isOpen: true,
                    title: itemToShow[0].title,
                    content: itemToShow[0].content,
                    id: itemToShow[0].id,
                });
            }
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
        const columnFinish = (this.props.columns as any)[
            destination.droppableId
        ];

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

            console.log(newState)

            // no need to fire an API call here because we're not interested in 
            // persisting the order the tasks are in the columns. 
            this.props.moveTodo(newState.todos, newState.columns, false);
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
            this.props.moveTodo(newState.todos, newState.columns, true);
        }
    };

    render() {
        console.log(this.props)
        console.log(this.state)
        return (
            <>
                {this.state.isOpen && (
                    <TaskDetailModal
                        title={this.state.title}
                        content={this.state.content}
                        isOpen={this.state.isOpen}
                        toggleModal={() => {
                            this.setState({ isOpen: !this.state.isOpen });
                        }}
                    />
                )}
                <BoardTitleBar>
                    <span>Quote of the day:</span>
                    <ActivityDrawer />
                </BoardTitleBar>

                <BoardEl>
                    {/* Create context for drag & drop */}
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {/* Get all columns in the order specified in 'board-initial-data.ts' */}
                        {this.props.columnsOrder.map((columnId: string) => {
                            // Get id of the current column
                            const column = (this.props.columns as any)[
                                columnId
                            ];

                            // Get item belonging to the current column
                            const items = column && column.itemIds.map(
                                (itemId: string) => {
                                    console.log(Object.values(this.props.todos))
                                    return Object.values(this.props.todos).filter((item:any) => {
                                       return item.id === itemId
                                    })[0]
                                }
                            );

                            console.log(items)

                            // Render the BoardColumn component
                            return (
                                <TaskManagementBoardColumn
                                    key={column.id}
                                    column={column}
                                    items={items}
                                />
                            );
                        })}
                    </DragDropContext>
                </BoardEl>
            </>
        );
    }
}

export default connector(TaskManagementBoard);