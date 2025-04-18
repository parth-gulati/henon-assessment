
import { Typography, Container, Paper, Box } from "@mui/material";
import styled from '@emotion/styled';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import facepaint from 'facepaint'

import SignInForm from '../components/Auth/SignInForm'

// breakpoints for responsive design
const breakpoints = [480, 768, 1024, 1440];
// media query for responsive design
// using facepaint for media queries
// this allows for an array of breakpoints to be passed in
// and generates the media queries for each breakpoint
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

const SignIn = ({ token, setToken }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!!token) {
            navigate('/');
        }
    }, [token])


    return (
        <StyledContainer maxWidth="sm">
            <StyledPaper elevation={3}>
                <HeaderDiv>
                    <StyledHeader style={{ color: 'primary' }} variant="h5">Sign In</StyledHeader>
                </HeaderDiv>
                <Box style={{ flex: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <StyledDescription variant="body2">Sign in to manage your events</StyledDescription>
                    </Box>
                </Box>
                <Box style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <SignInForm setToken={setToken} />
                    <Box style={{ width: '100%' }}>
                        <Typography style={{ textAlign: 'left', fontSize: '0.8rem' }} color="secondary" variant="body2" component={Link} to="/signup">Noobie? Sign up. :)</Typography>
                    </Box>
                </Box>
            </StyledPaper>
        </StyledContainer>
    );


};

const StyledDescription = styled(Typography)`
    font-size: 1rem;
`

const StyledPaper = styled(Paper)`
    padding: 1rem;
    margin: 1rem;
    ${mq({
    minHeight: ['450x', '425px', '400px', '450px'],
    margin: ['0.5rem', '1rem', '1.5rem', '2rem'],
    minWidth: ['90vw', '330px', '400px', '500px']
})};
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledHeader = styled(Typography)`
    text-align: center;
    padding-top: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
font-family: "Quicksand", serif;
      font-weight: 400;
  font-style: normal;
`

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
`

const HeaderDiv = styled.div`
  display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
  min-height: 90px;
  flex: 1;
  aspect-ratio: 1.8;
`;

export default SignIn;
