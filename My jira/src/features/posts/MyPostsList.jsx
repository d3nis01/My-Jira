import { selectAllPosts } from './postsSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { styled } from '@stitches/react'

import { Droppable } from "react-beautiful-dnd";
import MyPost from './MyPost'


const StyledColumn = styled("div", {
padding: "10px 10px",
display: "flex",
flexDirection: "column",
marginTop: 8,

h2: {
  margin: 0,
  textAlign: "center"
}
});

const StyledList = styled("div", {
backgroundColor: "#ddd",
borderRadius: 8,
padding: 16,
display: "flex",
flexDirection: "column",
flexGrow: 1,
marginTop: 8,
boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)"

});


const MyPostsList = ({ column }) => {

    const allPosts = useSelector(selectAllPosts);

return (
    <Droppable droppableId={column?.title}>
        {(provided) => (
            <StyledColumn>
            <h2>{column?.title}</h2>
            <StyledList {...provided.droppableProps} ref={provided.innerRef}>
                {column?.list?.map((element) => {
                    if (element)
                    return (
                    <Link className='post-link' to={`post/${element.id}`}>
                        <MyPost key={element.title} text={element.title} index={element.id} />
                    </Link>
                    )
                })}
                {provided.placeholder}
            </StyledList>
            </StyledColumn>
        )}
    </Droppable>
)
}

export default MyPostsList