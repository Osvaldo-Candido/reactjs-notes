import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: ${({theme, isNew}) => isNew ? "transparent" : theme.COLORS.BACKGROUND_900 };
    color: ${({theme})=>theme.COLORS.GRAY_300};

    border: ${({isNew, theme})=> isNew ? `1px dashed ${theme.COLORS.GRAY_300}` : 'none' };
    margin-bottom:8px;
    border-radius:10px;
    padding-right:16px;
    .btn-delete {
        color: ${({theme})=>theme.COLORS.RED} ;
    }
    .btn-add {
        color: ${({theme})=>theme.COLORS.ORANGE} ;
    }
    > button {
        border:none;
        background: none;
    }
    > input {
        width: 100%;
        height: 56px;

        padding: 12px;
        color: ${({theme})=> theme.COLORS.WHITE};
        background: transparent;
        border:none;

        &::placeholder {
            color: ${({theme})=>theme.COLORS.GRAY_300};
        }
    }
`