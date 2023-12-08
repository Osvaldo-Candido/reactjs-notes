import { api } from "../../services/api";
import { Container, Form, Avatar } from "./style";
import { useState } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import ImgProfile from "../../assets/ossan.jpg"
import { useAuth } from "../../hooks/Auth";
export function Profile()
{

    const {user, updateProfile } = useAuth()

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [passwordOld, setPasswordOld] = useState()
    const [passwordNew, setPasswordNew] = useState()
    
    const urlAvatar = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : ImgProfile

    const [avatar, setAvatar] = useState(urlAvatar)
    const [avatarFile, setAvatarFile] = useState(null)

    function updateAvatar(event)
    {
        const file = event.target.files[0]
        setAvatarFile(file)

        const imageUrl = URL.createObjectURL(file)
        setAvatar(imageUrl)
    }

    async function handleUpdateProfile()
    {
        const userUpdate = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }
        const userUpdated = Object.assign(user, userUpdate)
        await updateProfile({user: userUpdated, avatarFile})
    }


    return(
        <Container>
            <header>
                <Link to='/'>
                <FiArrowLeft/>
                </Link> 
            </header>
            <Form>
                <Avatar>
                    <img src={avatar} alt={avatar}/>
                    <label htmlFor="avatar">
                        <FiCamera/>
                        <input type="file" id="avatar" onChange={updateAvatar} />
                    </label>
                </Avatar>
            <Input
                placeholder="Insira o nome"
                type="text"
                icon={FiUser}
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <Input
                placeholder="Insira o seu e-mail"
                type="email"
                icon={FiMail}
                value={email}
                onChange={e=>setEmail(e.target.email)}
            />
            <Input
                placeholder="Antiga senha"
                type="password"
                icon={FiLock}
                onChange={e => setPasswordOld(e.target.value)}
            />
            <Input
                placeholder="Nova senha"
                type="password"
                icon={FiLock}
                onChange={e => setPasswordNew(e.target.value)}
            />
            <Button title="Editar" onClick={handleUpdateProfile} />
            </Form>  
            
        </Container>
    )
}