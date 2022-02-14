import { useMutation } from '@apollo/client'
import { IconButton } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { READ_QUERY, DEL_ACTIONS } from '../apollo/queries'

const TodoDel = (props) => {
    const [deleteTodo, { data, loading, error, client, reset }] = useMutation(DEL_ACTIONS, {
        refetchQueries: [{ query: READ_QUERY }]
    })
    if (error) return <p>An error occurred</p>
    const handleClick = (e) => {
        console.log({e})
        return deleteTodo({
            variables: {
                id: props.value
            }
        })
    }
    return (
        <>
            <IconButton edge="end" aria-label="comments" onClick={handleClick}>
                <DeleteIcon />
            </IconButton>
        </>
    )
}

export default TodoDel;