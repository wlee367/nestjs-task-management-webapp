import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { TaskManagementBoardItem } from "./TaskManagementBoardItem";
import { NewCardModal } from "../NewCardModal/NewCardModal";
import { useDispatch } from "react-redux";
import { createTodo } from "../../redux/actions";

// Define types for board column element properties
type BoardColumnProps = {
  key: string;
  column: any;
  items: any;
};

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
  isDraggingOver: boolean;
  children: any;
  ref: any;
};

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 8px;
  background-color: #ebecf0;
  border-radius: 4px;
  height: fit-content;

  & + & {
    margin-left: 12px;
  }
`;

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font: 14px sans-serif;
  margin: 0;
  padding-bottom: 0.5em;
`;

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${(props) => (props.isDraggingOver ? "#aecde0" : null)};
  border-radius: 4px;
  margin-bottom: 1em;
`;

const AddCardLink = styled.div`
  margin-top: auto;
  flex-grow: 0;
  font: 12px sans-serif;
  color: grey;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

// Create and export the BoardColumn component
export const TaskManagementBoardColumn: React.FC<BoardColumnProps> = (
  props
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmitForm = (title: string, description: string) => {
    dispatch(createTodo(title, description));
    setIsModalOpen(false);
  };

  console.log(props.items);

  return (
    <>
      {isModalOpen && (
        <NewCardModal
          submitForm={handleSubmitForm}
          isOpen={isModalOpen}
          toggleModal={() => {
            setIsModalOpen(!isModalOpen);
          }}
        />
      )}
      <BoardColumnWrapper>
        {/* Title of the column */}
        <BoardColumnTitle>{props.column.title}</BoardColumnTitle>

        <Droppable droppableId={props.column.id}>
          {(provided, snapshot) => (
            <BoardColumnContent
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {/* All board items belong into specific column. */}
              {props.items.map((item: any, index: number) => (
                <TaskManagementBoardItem
                  key={item.id}
                  item={item}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </BoardColumnContent>
          )}
        </Droppable>
        <AddCardLink
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          + Add a cuh
        </AddCardLink>
      </BoardColumnWrapper>
    </>
  );
};
