import { Container, Links, Content } from "./style"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { api } from "../../services/api"
export function Details() {
    
    const params = useParams()

    const [data, setData] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchNote()
        {
            const response = await api.get(`/notes/${params.id}`)
            setData(response.data)
            console.log(response.data)
        }

        fetchNote()
    },[])
    async function handleDelete()
    {
        const confirm = window.confirm("Deseja realmente remover a nota?")

        if(confirm)
        {
            await api.delete(`/notes/${params.id}`)
            handleBack()
        }
    }
    function handleBack()
    {
        navigate(-1)
    }
    return (
        <Container>
            <Header />
            {
                data && 
                <main>
                    <Content>
                        <ButtonText title="Excluir nota" onClick={handleDelete} />
                        <h1>{data.title}</h1>
                        <p>
                            {data.description}
                        </p>
                        { data.links &&
                        <Section title="Links Utéis">
                            <Links>
                                { data.links.map(link => (
                                    <li key={String(link.id)}><a href={link.url} target="_blank">{link.url}</a></li>
                                ))
                                }
                            </Links>
                        </Section>}
                        { data.tag &&
                        <Section title="Marcadores"> {
                             data.tag.map(tg => (
                                <Tag key={String(tg.id)} title={tg.name} />
                            ))}
                        </Section>
                        }
                        <Button title="Voltar" onClick={handleBack} />
                    </Content>
                </main>
            }
        </Container>
    )
}