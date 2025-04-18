// Layout.jsx - This file defines the layout of the application.
// It includes the header and a styled container for the main content.
// It also handles user authentication and redirects to the sign-in page if the
// user is not authenticated.

import { Container } from "@mui/material";
import Header from "./Header";
import { ThemeProvider } from '@mui/material/styles'
import { darkTheme } from "./Theme";
import styled from '@emotion/styled'
import { Outlet, useNavigate } from "react-router";
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from "react";
import { getuser, logout } from "../../api/authenticationApi";
import { useUser } from "../../context/UserContext";

const Layout = ({ token, removeToken }) => {

    const { loginUser, logoutUser } = useUser();
    const navigate = useNavigate();

    // if token is not present or has expired, redirect to sign in page
    useEffect(() => {
        const getUser = async () => {
            const user = await getuser(token);
            if (user.status == 401) {
                await logout();
                logoutUser();
                removeToken();
                navigate('/');
            }
            loginUser(user.data.data.user);

        }
        if (token) {
            getUser();
        }
    }, [token])

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header token={token} removeToken={removeToken} />
            <StyledContainer>
                <Outlet />
            </StyledContainer>
        </ThemeProvider>
    );
}

const StyledContainer = styled(Container)`
    margin-top: 20px;
`

export default Layout;
