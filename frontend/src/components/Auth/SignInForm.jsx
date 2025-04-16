import { Box, TextField, Button } from "@mui/material"
import styled from '@emotion/styled';
import { useForm, Controller } from "react-hook-form"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { getuser, login } from "../../api/authenticationApi";
import { toast } from "react-toastify";
import { useState } from "react";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        .required("Password is required"),
});

const SignInForm = ({setToken}) => {

    const [loading, setLoading] = useState(false);

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data) => {
        setLoading(true)
        const res = await login(data)
        console.log(res)
        setLoading(false)

        if(res.status==200){
            toast.success('Successfully logged in!')
            setToken(res.data.data.access_token)
        }
        else{
            console.log(res)
            toast.error(res.data.message)
        }
        

    }

    return (
        <form style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }} onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
            <InputBox>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value, ref }, fieldState: {error} }) => (
                        <TextField type="email" fullWidth color="secondary" id="outlined-basic" label="Email" variant="outlined"
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            error={!!error}
                            helperText={error?.message ?? null}
                        />
                    )}
                />
            </InputBox>
            <InputBox>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value, ref }, fieldState: {error} }) => (
                        <TextField type="password" color="secondary" fullWidth id="filled-basic" label="Password" variant="outlined"
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            error={!!error}
                            helperText={error?.message ?? null}
                        />
                    )}
                />
            </InputBox>
            <Button type="submit" color="secondary" style={{ marginTop: '20px', marginBottom: '20px' }}>Sign In</Button>
        </form>
    )
}

const InputBox = styled(Box)`
    padding: 5px;  
    width: 85%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

`

export default SignInForm