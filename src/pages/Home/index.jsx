import {Container, Content, Brand, Menu, NewNote, Search} from './style'
import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import {FiPlus} from 'react-icons/fi'
import { Input } from '../../components/Input'
import {Section} from '../../components/Section'
import {Notes} from '../../components/Notes'
import {api} from '../../services/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export function Home()
{

    const [tags, setTags] = useState([])
    const [tagsSelect, selectTagsSet] = useState([])
    const [search, setSearch] = useState("")
    const [notes, setNotes] = useState([])
    const navigate = useNavigate()

    function handlSelectedTag(tagName)
    {
        if(tagName === 'all')
        {
            return selectTagsSet([])
        }

        const alreadySelected = tagsSelect.includes(tagName)

        if(alreadySelected){
            const filterTags = tagsSelect.filter(tag => tag !== tagName)
            selectTagsSet(filterTags)

        }else{
            selectTagsSet(prevState => [...prevState, tagName])
        }
        

    }
    function handleDetails(id)
    {
        navigate(`/details/${id}`)
    }
    useEffect(() => {

        async function foundTags()
        {
            const response = await api.get("/tags")
            console.log(response.data)
            setTags(response.data)
        }

        foundTags()

    }, [])

    useEffect(()=> {
        async function fetchNotes()
        {
            const response = await api.get(`/notes?tags=${tagsSelect}&title=${search}`)
            setNotes(response.data)
        }

        fetchNotes()
    },[tagsSelect, search])

    return(
        <Container>
            <Brand>
            <h1>Rocket Notes</h1>
            </Brand>
            <Header/>
            <Menu>
                <li>
                    <ButtonText 
                    title="Todos" 
                    isActive={tagsSelect.length === 0}
                    onClick={() => handlSelectedTag('all')} 
                /></li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)} >
                            <ButtonText 
                            title={tag.name}
                            onClick={() => handlSelectedTag (tag.name)}
                            isActive={tagsSelect.includes(tag.name)}
                            /></li>
                    ))
                }
                
                
            </Menu>
            <Search>
                <Input 
                    placeholder="Pesquisar Notas"
                    onChange={e => setSearch(e.target.value)}
                />
            </Search>
            <Content>
                <Section title='Minas notas'>
                    { 
                        notes.map(note => (
                            <Notes
                                key={String(note.id)}
                                data={note}
                                onClick={()=>handleDetails(String(note.id))}
                            />
                        ))
                    }
                </Section>
            </Content>
            <NewNote to='/new'>
                <FiPlus/>
                Criar Nota
            </NewNote>
        </Container>
    )
}