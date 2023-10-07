import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  Box,
  Stack,
  Container,
  TextField,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { login } from "../../features/user/userSlice";

type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
});

const Form = () => {
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submit(data: FormData) {
    dispatch(
      login({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      }),
    );

    navigate("/");
  }

  const errors = form.formState.errors;

  return (
    <Card sx={{ width: 350 }}>
      <CardHeader title="Sign up" />
      <CardContent>
        <form onSubmit={form.handleSubmit(submit)}>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              {...form.register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              label="Last Name"
              {...form.register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <TextField
              label="Email"
              type="email"
              {...form.register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              {...form.register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained">
              Sign up
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

const SignUp = () => {
  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Form />
      </Box>
    </Container>
  );
};

export default SignUp;
