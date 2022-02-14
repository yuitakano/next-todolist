import CustomButton from '../components/customButton'
import { useMutation } from '@apollo/client'
import { READ_QUERY, UPDATED_ACTIONS } from '../apollo/queries'

const TodoUpdate = (props) => {
    const [updateTodo, { data, loading, error, client, reset }] = useMutation(UPDATED_ACTIONS, {
        refetchQueries: [{ query: READ_QUERY }]
    })
    const handleClick = e => {
        updateTodo({
            variables: {
                id: Number(props.id),
                name: props.value
            }
        })
        console.log({props})
        if (typeof props.handlechange === 'function') {
            props.handlechange
        }
    }
    return (
        <>
            <CustomButton
                onClick={handleClick}
                disabled={props.disabled}
                {...props}
                style={{
                    borderRadius: '5px 0 0 5px'
                }}
            >Update</CustomButton>
        </>
    )
}

export default TodoUpdate