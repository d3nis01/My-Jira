import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { styled } from '@stitches/react'

const StyledItem = styled("div", {
    backgroundColor: "#44d5bf",
    borderRadius: 4,
    padding: "4px 8px",
    transition: "background-color .8s ease-out",
    marginTop: 8,
    fontSize: "19px",
    fontWeight: "600",
  
    ":hover": {
      backgroundColor: "#322323",
      transition: "background-color .1s ease-in"
    }
  });

const MyPost = ({ text, index }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {provided => (
        <StyledItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </StyledItem>
      )}
    </Draggable>
  )
}

export default MyPost