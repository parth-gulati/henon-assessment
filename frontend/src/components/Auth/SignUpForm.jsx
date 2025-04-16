import { Box, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { getuser, signup } from "../../api/authenticationApi";

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
});

const SignUpForm = ({setToken}) => {
    const [loading, setLoading] = useState(false);
  
    const { handleSubmit, control } = useForm({
      resolver: yupResolver(SignUpSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
  
    const onSubmit = async (data) => {
      setLoading(true);
      const { confirmPassword, ...formData } = data;
      console.log(formData)
      const res = await signup(formData);
      setLoading(false);
  
      if (res.status === 200 || res.data.status == "success") {
        toast.success("Account created successfully!");
        setToken(res.data.data.access_token)

      } else {
        toast.error(res.data.message || "Sign-up failed!");
      }
    };
  
    return (
      <form
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputBox>
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                color="secondary"
                label="First Name"
                variant="outlined"
                style={{ marginRight: "10px" }}
                error={!!error}
                helperText={error?.message ?? null}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                color="secondary"
                label="Last Name"
                variant="outlined"
                error={!!error}
                helperText={error?.message ?? null}
              />
            )}
          />
        </InputBox>
  
        <InputBox>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="email"
                fullWidth
                color="secondary"
                label="Email"
                variant="outlined"
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
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="password"
                fullWidth
                color="secondary"
                label="Password"
                variant="outlined"
                error={!!error}
                helperText={error?.message ?? null}
              />
            )}
          />
        </InputBox>
  
        <InputBox>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="password"
                fullWidth
                color="secondary"
                label="Confirm Password"
                variant="outlined"
                error={!!error}
                helperText={error?.message ?? null}
              />
            )}
          />
        </InputBox>
  
        <Button
          type="submit"
          color="secondary"
          style={{ marginTop: "20px", marginBottom: "20px" }}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    );
  };
  
  const InputBox = styled(Box)`
    padding: 5px;
    width: 85%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  `;
  
  export default SignUpForm;