import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { TaskManagementBoardColumn } from './TaskManagementBoardColumn';
import { TaskDetailModal } from '../TaskDetailModal/TaskDetailModal';
import { ActivityDrawer } from '../ActivityDrawer/ActivityDrawer';

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

type TaskManagementBoardProps = {
    detailId?: string;
    todos? : object;
    columns? : object;
    columnsOrder? : [];
};

type TaskManagementBoardState = {
    doesDetailIdExist: boolean;
    detailId?: string;
};

export class TaskManagementBoard extends React.Component<
    TaskManagementBoardProps,
    any
> {
    // Initialize board state with board data
    state = {
        items: this.props.todos ? this.props.todos : [],
        columns: this.props.columns ? this.props.columns : [],
        columnsOrder: this.props.columnsOrder ? this.props.columnsOrder : [],
        isOpen: false,
        title: '',
        content: '',
        id: '',
    };


    componentDidMount() {
        if (this.props.detailId) {
            const itemToShow = Object.values(this.state.items).filter(
                (item) => {
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
        const columnStart = (this.state.columns as any)[source.droppableId];

        // Find column in which the item was dropped
        const columnFinish = (this.state.columns as any)[
            destination.droppableId
        ];

        // Moving items in the same list
        if (columnStart === columnFinish) {
            // Get all item ids in currently active list
            const newItemsIds = Array.from(columnStart.itemsIds);

            // Remove the id of dragged item from its original position
            newItemsIds.splice(source.index, 1);

            // Insert the id of dragged item to the new position
            newItemsIds.splice(destination.index, 0, draggableId);

            // Create new, updated, object with data for columns
            const newColumnStart = {
                ...columnStart,
                itemsIds: newItemsIds,
            };

            // Create new board state with updated data for columns
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumnStart.id]: newColumnStart,
                },
            };

            // Update the board state with new data
            this.setState(newState);
        } else {
            // Moving items from one list to another
            // Get all item ids in source list
            const newStartItemsIds = Array.from(columnStart.itemsIds);

            // Remove the id of dragged item from its original position
            newStartItemsIds.splice(source.index, 1);

            // Create new, updated, object with data for source column
            const newColumnStart = {
                ...columnStart,
                itemsIds: newStartItemsIds,
            };

            // Get all item ids in destination list
            const newFinishItemsIds = Array.from(columnFinish.itemsIds);

            // Insert the id of dragged item to the new position in destination list
            newFinishItemsIds.splice(destination.index, 0, draggableId);

            // Create new, updated, object with data for destination column
            const newColumnFinish = {
                ...columnFinish,
                itemsIds: newFinishItemsIds,
            };

            // Create new board state with updated data for both, source and destination columns
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumnStart.id]: newColumnStart,
                    [newColumnFinish.id]: newColumnFinish,
                },
            };

            // Update the board state with new data
            this.setState(newState);
        }
    };

    render() {
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
                        {this.state.columnsOrder.map((columnId) => {
                            // Get id of the current column
                            const column = (this.state.columns as any)[
                                columnId
                            ];

                            // Get item belonging to the current column
                            const items = column && column.itemIds.map(
                                (itemId: string) => {
                                    return Object.values(this.state.items).filter(item => {
                                       return item.id === itemId
                                    })[0]
                                }
                            );

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
