import { useSelector } from "react-redux";
import { useGetStatusesQuery, selectAllStatuses } from "./statusesSlice";
import { selectAllPosts, useUpdatePostMutation } from "./postsSlice";
import React, { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { styled } from '@stitches/react'
import { useEffect } from "react";
import MyPostsList from "./MyPostsList";

  const StyledColumns = styled("div", {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    margin: "30px auto",
    width: "80%",
    height: "90vh",
    gap: "8px",

  });
  
const MyPostCategory = () => {

    const [updatePost, { isLoading }] = useUpdatePostMutation()

    const allStatuses = useSelector(selectAllStatuses);
    const allPosts = useSelector(selectAllPosts);

    const [columns, setColumns] = useState([])

    useEffect(() => {
        const listedStatuses = allStatuses.map((status) => {
            const postsForCategory = allPosts.filter(post => post.currentStatus === status.title);
            return {id: status.id, title: status.title, list: postsForCategory};
        })
        setColumns(listedStatuses)
    }, [allStatuses, allPosts])

      const onDragEnd = (DropResult) => {

        if (!DropResult.destination) {
            return;
          }
        
        if (DropResult.destination === undefined || DropResult.destination === null) return null;
      
        // Make sure we're actually moving the item
        if (
          DropResult.source.droppableId === DropResult.destination.droppableId &&
          DropResult.destination.index === DropResult.source.index
        ) {
          return null;
        }
      
        const start = columns.find((column) => column.title === DropResult.source.droppableId );
        const end = columns.find((column) => column.title === DropResult.destination.droppableId );

        if (start === end) {
          const newList = start.list.filter((post) => post.id !== DropResult.source.index);
      
          newList.splice(DropResult.destination.index, 0, start.list.find(el => el.id === DropResult.source.index));
      
          const newCol = {
            id: start.id,
            list: newList,
            title: start.title,
          };
      
          setColumns(columns.map((state) => {
            if (state.title === newCol.title) {
              return newCol;
            } else { return state; }
          }));
          return null;
        } else {
          const newStartList = start.list.filter((post) => post.id !== DropResult.source.index);
      
          const newStartCol = {
            id: start.id,
            title: start.title,
            list: newStartList,
          };
      
          const newEndList = end.list;
      
          newEndList.splice(DropResult.destination.index, 0, start.list.find(el => el.id === DropResult.source.index));
      
          const newEndCol = {
            id: end.id,
            title: end.title,
            list: newEndList,
          };
          
          const postFound = start.list.find(el => el.id === DropResult.source.index)
      
          updatePost({ id: postFound.id, title: postFound.title, body: postFound.body, currentStatus: DropResult.destination.droppableId }).unwrap()

          setColumns(columns.map((state) => {
            if (state.title === newStartCol.title) {
              return newStartCol;
            } else if (state.title === newEndCol.title) {
              return newEndCol;
            } else { return state; }
          }));
          return null;
        }
      };

    return (
    <DragDropContext onDragEnd={onDragEnd}>
        <StyledColumns>
        {Object.values(columns).map((col) => (
                <MyPostsList key={col.title} column={col} />
        ))}
        </StyledColumns>
    </DragDropContext>
    )
}

export default MyPostCategory