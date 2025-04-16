
import { Container } from "@mui/material";
import Header from "./Header";
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from "./Theme";
import styled from '@emotion/styled'
import { Outlet, useNavigate } from "react-router";
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from "react";
import { getuser, logout } from "../../api/authenticationApi";
import { useUser } from "../../context/UserContext";

const Layout = ({ token, removeToken }) => {

    const { loginUser, logoutUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const user = await getuser(token);
            console.log(user)
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
