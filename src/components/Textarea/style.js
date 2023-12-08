import styled from "styled-components";

export const Container = styled.textarea`
width: 100%;
height: 150px;

resize: none;
border: none;
border-radius: 10px;
padding: 16px;
background-color: ${({theme})=>theme.COLORS.BACKGROUND_900};
margin-bottom: 8px;
color:  ${({theme})=>theme.COLORS.WHITE};

&:placeholder{
    color: ${({theme})=>theme.COLORS.GRAY_300};
}
`