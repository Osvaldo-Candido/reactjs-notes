import { useState } from "react"
import {api} from '../../services/api'
import { Container, Form, Background } from "./style";
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from "react-router-dom";


export function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPasword] = useState("")

    const navigate = useNavigate()
    function handleSignup() {
        
        if(!name || !email || !password)
        {
            alert('Preencha todos campos')
        }
        api.post('/users/create',{name, email, password})
        .then(()=>{
            alert('Cadastrado com sucesso')
            navigate('/')
        })
        .catch(error =>  {
            if(error.response)
            {
                alert(error.response.data.message)
            }else{
                alert('Não foi possível cadastrar usuário')
            }
        })

    }

    return (
        <Container>
            <Background />
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>
                <h2>Crie sua conta</h2>
                <Input
                    type="text"
                    placeholder="Insira o seu nome"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)} />
                <Input
                    type="email"
                    placeholder="Insira o seu e-mail"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)} />
                <Input
                    type="password"
                    placeholder="Insira a sua senha"
                    icon={FiLock}
                    onChange={e => setPasword(e.target.value)} />
                <Button
                    title="Cadastrar"
                    onClick={handleSignup} />
                <Link to='/'>
                    Voltar para o login
                </Link>
            </Form>
        </Container>
    )
}