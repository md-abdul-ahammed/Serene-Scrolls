import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

export default function SignUp() {
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      password: hasLength(
        { min: 5, max: 10 },
        "Password must be at least 5-10 characters long"
      ),
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Merienda, ${theme.fontFamily!}`,
          fontWeight: 900,
        })}
      >
        Create New Account
      </Title>
      <Text
        sx={(theme) => ({
          fontFamily: `Merienda, ${theme.fontFamily!}`,
        })}
        color="dimmed"
        size="sm"
        align="center"
        mt={5}
      >
        Already have an account?{" "}
        <Link to="/auth/login">
          <Anchor
            sx={(theme) => ({
              fontFamily: `Merienda, ${theme.fontFamily!}`,
            })}
            size="sm"
            component="button"
          >
            Login
          </Anchor>
        </Link>
      </Text>
      <form
        onSubmit={form.onSubmit(async (values): Promise<void> => {
          const res: any = await register(values);
          notifications.show({
            id: "success-login",
            withCloseButton: true,
            title:
              res?.data?.statusCode === 200
                ? "Sign up Success"
                : "Sign up Failure, Try again",
            message:
              res?.data?.statusCode === 200
                ? res.data?.message
                : res?.error?.data.message,
            color: res?.data?.statusCode === 200 ? "cyan" : "red",
            icon: <IconX />,
            className: "my-notification-class",
            loading: false,
          });
        })}
      >
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Full Name"
            placeholder="Abdul A."
            required
            {...form.getInputProps("fullName")}
          />
          <TextInput
            label="Email"
            mt={10}
            placeholder="mail@abdul.com"
            required
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />

          <Button
            disabled={isLoading}
            fullWidth
            gradient={{ from: "#6f4cdf", to: "#4e359e" }}
            mt="xl"
            type="submit"
          >
            Submit
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
