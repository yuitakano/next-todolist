import CustomButton from '../components/customButton'
import { useMutation } from '@apollo/client'
import { READ_QUERY, ADD_ACTIONS } from '../apollo/queries'

const TodoAdd = (...props) => {
    const [createTodo, { data, loading, error, client, reset }] = useMutation(ADD_ACTIONS, {
        refetchQueries: [{ query: READ_QUERY }]
    })
    if (error) return <p>An error occurred</p>

    return (
        <>
            <CustomButton 
                onClick={(e) => createTodo({
                    variables: {
                        name: props[0].value,
                        done: false,
                        publishedAt: new Date()
                    }
                })}
                disabled={props[0].disabled}
                style={{
                    borderRadius: '5px 0 0 5px'
                }}
                {...props}
            >Add</CustomButton>
        </>
    )
}

export default TodoAdd;