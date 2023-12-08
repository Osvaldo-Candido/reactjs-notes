import {createContext, useContext, useState, useEffect} from 'react'
import { api } from '../services/api'
export const authContext = createContext({})

function AuthProvider({children})
{
    const [data, setData] = useState({})
    async function signIn({email, password})
    {
        
        try {
            const session = await api.post('session/create',{email, password})
            const {token, user} = session.data

            localStorage.setItem('@rocketnotes:user',JSON.stringify(user))
            localStorage.setItem('@rocketnotes:token',token)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setData({user, token})
        } catch (error) {
            if(error.response)
            {
                console.log(error.response)
            }else{
                alert('Não foi possível iniciar a sessão')
            }
        }
    }
    async function updateProfile({user, avatarFile})
    {

        try {
            if(avatarFile)
            {
                const fileUpload = new FormData()
                fileUpload.append('avatar',avatarFile)
                const avatar = await api.patch('/users/avatar',fileUpload)
                user.avatar = avatar.data.avatar
            }

            await api.put('/users/update',user)
            localStorage.setItem('@rocketnotes:user',JSON.stringify(user))
            setData({user, token: data.token})
            alert('Actualizado com sucesso')
        } catch (error) {
            if(error.response)
            {
                console.log(error.response.data.message)
            }else{
                console.log('Não foi possível actualizar o usuário')
            }
        }
    }
    function signOut()
    {
        localStorage.removeItem('@rocketnotes:token')
        localStorage.removeItem('@rocketnotes:user')

        setData({})
    }
    useEffect(()=>{
        const token = localStorage.getItem('@rocketnotes:token')
        const user  = localStorage.getItem('@rocketnotes:user')

        if(token && user)
        {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setData({
                user: JSON.parse(user),
                token
            })
        }
    },[])

    return (
        <authContext.Provider value={{signIn, signOut, updateProfile, user: data.user}}>
            {children}
        </authContext.Provider>
    )
}

function useAuth()
{
    const context = useContext(authContext)

    return context
}

export {AuthProvider, useAuth}