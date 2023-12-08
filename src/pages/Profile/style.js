import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;

    >header{
        width: 100%;
        height: 144px;

        display: flex;
        align-items: center;

        padding: 0 124px;
        background-color: ${({theme})=>theme.COLORS.BACKGROUND_900};

        svg {
            color: ${({theme})=>theme.COLORS.GRAY_100};
            font-size: 24px;
        }
    }
`

export const Form = styled.form`
    max-width: 340px;
    margin: 30px auto 0;

    >div:nth-child(4)
    {
        margin-top: 24px;
    }
`

export const Avatar = styled.div`
    position: relative;
    margin: -124px auto 30px;
    width: 186px;
    height: 186px;
    border-radius: 50%;

    >img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
        object-fit: cover;
    }
    >label {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: ${({theme})=>theme.COLORS.ORANGE};
        display: flex;
        align-items: center;
        justify-content: center;

        position: absolute;

        bottom: 7px;
        right: 7px;
        cursor: pointer;
        input {
            display: none;
        }
        svg {
            width: 20px;
            height: 20px;
            color: ${({theme})=>theme.COLORS.BACKGROUND_900};
        }
    }
`