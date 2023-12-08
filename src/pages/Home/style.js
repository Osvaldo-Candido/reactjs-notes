import styled from 'styled-components'
import { Link } from 'react-router-dom'
export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 105px 128px auto 64px;
    grid-template-areas: 
    "brand header"
    "menu search"
    "menu content"
    "newnote content";

    background-color: ${({theme})=>theme.COLORS.BACKGROUND_800};

`
export const Content = styled.div`
    grid-area: content;
    padding: 0 64px;
    overflow-y: auto;
`
export const Menu = styled.ul`
    grid-area: menu;
    padding-top: 64px;
    text-align: center;
    background-color: ${({theme})=>theme.COLORS.BACKGROUND_900};
    
    > li {
        margin-bottom: 24px;
    }
`
export const Brand = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=>theme.COLORS.BACKGROUND_900};
    border-bottom: 1px solid ${({theme})=>theme.COLORS.BACKGROUND_700};
    h1 {
    color: ${({theme})=>theme.COLORS.ORANGE};
    font-size: 24px;
    }

`
export const NewNote = styled(Link)`
    grid-area: newnote;
    background-color: ${({theme})=>theme.COLORS.ORANGE};
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        margin-right: 10px;
    }
`
export const Search = styled.div`
    grid-area: search;
    padding: 64px 64px 0;
` 