import { useState } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, Divider, TextField, ButtonGroup, ListItemIcon, Radio } from '@mui/material';
import CustomButton from '../components/customButton'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { READ_QUERY } from '../apollo/queries'
import TodoAdd from './add'
import TodoDel from './delete'
import TodoUpdate from './updated'

const Index = () => {
    let data = {}
    let items = null
    let cacheValue = ''
    const [searchModel, setSearchModel] = useState(cacheValue)
    const [selectedValue, setSelected] = useState(null)
    const [isEdit, setEdit] = useState(false)



    const handleToggle = (item) => {
        setSearchModel(item.attributes.name)
        setSelected(item.id)
    }
    const handleSearch = (e) => {
        setSearchModel(e.target.value)
        if (!e.target.value) {
            setSelected(null)
        }
    }
    const handleEditStstus = () => {
        setEdit(!isEdit)
        setSearchModel('')
        setSelected(null)
    }

    const readRes = useQuery(READ_QUERY)
    data = { ...data, ...readRes.data }
    if (data && data.todos && Array.isArray(data.todos.data)) {
        console.log(data.todos.data, 'data.todos.data')
        items = data.todos.data.map(item => {
            const { name, done } = item.attributes
            return (
                <ListItem
                    disablePadding
                    key={item.id}
                    secondaryAction={
                        <TodoDel value={item.id} />
                    }
                >
                    <ListItemButton  onClick={(e) => handleToggle(item)}>
                        <ListItemIcon>
                            <Radio
                                edge="start"
                                checked={selectedValue === item.id}
                                value={item.id}
                                name="radio-buttons"
                                inputProps={{ 'aria-label': item.id }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={name} secondary={`id ${item.id}`} />
                    </ListItemButton>
                </ListItem>
            )
        })

    }
    return (
        <>
            <Box sx={{ width: 'calc(100% - 10px)', bgcolor: 'background.paper', padding: '5px' }}>
                <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    variant="standard"
                    sx={{
                        display: 'inline-block',
                        width: 'calc(100% - 190px)'
                    }}
                    value={searchModel}
                    onChange={handleSearch}
                />
                <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ height: '100%', display: 'inline-block', marginTop: '5px' }}>
                    
                    {isEdit ? 
                        (
                            <>
                                <TodoUpdate value={searchModel} id={selectedValue} disabled={!searchModel || !selectedValue} handlechange={handleEditStstus} />
                                <CustomButton onClick={handleEditStstus} style={{
                                    borderRadius: '0 5px 5px 0'
                                }}>Return</CustomButton>
                            </>
                        ) 
                        : (
                            <>
                                <TodoAdd value={searchModel} handlechange={handleEditStstus} disabled={!searchModel}/>
                                <CustomButton onClick={handleEditStstus} style={{
                                    borderRadius: '0 5px 5px 0'
                                }}>Edit</CustomButton>
                            </>
                        )}
                </ButtonGroup>
                <Divider />
                <nav aria-label="main mailbox folders">
                    <List>
                        {items}
                    </List>
                </nav>
            </Box>
        </>
    );

}

export async function getStaticProps() {
    const apolloClient = initializeApollo()
    await apolloClient.query({
        query: READ_QUERY,
    })

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    }
}

export default Index