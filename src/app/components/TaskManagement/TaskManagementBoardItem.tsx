import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

type BoardItemProps = {
    index: number;
    item: any;
};

type BoardItemStylesProps = {
    isDragging: boolean;
};

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
    padding: 8px;
    background-color: ${(props) => (props.isDragging ? '#d3e4ee' : '#fff')};
    border-radius: 4px;
    transition: background-color 0.25s ease-out;

    &:hover {
        background-color: #f7fafc;
    }

    & + & {
        margin-top: 4px;
    }
`;

export const TaskManagementBoardItem = (props: BoardItemProps) => {
    const history = useHistory();
    return (
        <Draggable draggableId={props.item.id} index={props.index}>
            {(provided, snapshot) => (
                <BoardItemEl
                    onClick={() => {
                        history.push(`/board/${props.item.id}`);
                    }}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    {props.item.title}
                </BoardItemEl>
            )}
        </Draggable>
    );
};
