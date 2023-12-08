import { api } from "../../services/api"
import { Container, Profile, Logout } from "./style"
import { useAuth } from "../../hooks/Auth"
import { RiShutDownLine } from 'react-icons/ri' 
import ImgProfile from "../../assets/ossan.jpg"
export function Header()
{
    const {signOut, user} = useAuth()
    const urlAvatar = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : ImgProfile
    return(
        <Container>
            <Profile to='/profile'>
                <img src={urlAvatar} alt="" />
                <div>
                    <span>Bem vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>
            <Logout to='/' onClick={signOut}>
                <RiShutDownLine/>
            </Logout>
        </Container>
    )
}