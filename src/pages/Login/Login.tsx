import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  Stack,
  Box,
  CardContent,
  CardHeader,
  Container,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Form = () => {
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function submit(data: FormData) {
    console.log(data);
  }

  const errors = form.formState.errors;

  return (
    <Card sx={{ width: 350 }}>
      <CardHeader title="Login" />
      <CardContent>
        <form onSubmit={form.handleSubmit(submit)}>
          <Stack spacing={2}>
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
              Login
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

const Login = () => {
  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Form />
      </Box>
    </Container>
  );
};

export default Login;
