import React from "react"
import styled from "styled-components";
import CallEnd from "@material-ui/icons/CallEnd";
const Button = styled.button`
margin: 1rem auto;
cursor: pointer;
font-size: 0.75rem;
text-decoration: none;
display: flex;
justify-items: center;
padding: 1rem 2rem 1rem 2rem;
border-radius: 1rem;
border: 0;
text-transform: uppercase;
background-color: #333740;
`;
type props = {
    hangUp: Function;
}
export const    HangUp = ({hangUp}: props) =>{
    return(
        <Button  onClick={() => {hangUp()}}>
        <CallEnd style={{color: "#fb0948"}}/>
      </Button>
    )
}