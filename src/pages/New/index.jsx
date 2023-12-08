import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "./style";
import {Header} from '../../components/Header'
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import {Section} from "../../components/Section";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
export function New()
{
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState("")

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState("")

    async function handleAddNotes()
    {
        if(!title)
        {
            alert("O campo título não pode estar vazio")
        }
        if(!description)
        {
            alert("O campo descrição não pode estar vazio")
        }
        if(tags)
        {
            alert("Voce precisa adicionar a informaçao no campo tag")
        }
        if(links)
        {
            alert("Voce precisa adicionar a informaçao no campo link")
        }
        await api.post('/notes',{
            title,
            description,
            tags,
            links
        })

        alert('Nota cadastrada com sucesso')
        navigate("/")
    }

    function handleAddTag()
    {
        setTags(prevState => [...prevState, newTag])
        setNewTag("")
    }

    function handleRemoveTag(deleted)
    {
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    function handleAddLink()
    {
        setLinks(prevState => [...prevState, newLink])
        setNewLink("")
    }

    function handleRemoveLink(deleted)
    {
        setLinks(prevState => prevState.filter( link => link !== deleted ))
    }

    return(
        <Container>
            <Header />
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to='/'>Voltar</Link>
                    </header>
                    <Input 
                        placeholder="Titulo" 
                        onChange={e => setTitle(e.target.value)
                        }
                        />
                    <Textarea 
                        placeholder="Observações" 
                        onChange={e => setDescription(e.target.value)}
                        />

                    <Section title="Links Utéis">
                        {
                            links.map((link, index)=>(
                                <NoteItem 
                                    key={String(index)}
                                    value={link}
                                    onClick={ () => handleRemoveLink(link)}  
                                />
                            ))
                        }
                        <NoteItem 
                            isNew 
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}  
                        />
                    </Section>
                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag) }
                                        />
                                ))
                            }
                            
                            <NoteItem 
                            isNew  
                            value={newTag}
                            onChange={e  => setNewTag(e.target.value)}
                            onClick={handleAddTag}
                            />
                        </div>
                    </Section>
                    <Button title="Salvar" onClick={handleAddNotes} />
                </Form>
            </main>
        </Container>
    )
}