import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
	NavLink,
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { Link } from "react-router-dom";
import AuthLayout from '../layouts/AuthLayout';

export default function Login() {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			remember: false
		},
		validate: {
			email: isEmail('Invalid email'),
			password: hasLength({ min: 5, max: 10 }, 'Password must be at least 5-10 characters long'),
		},
	});

	return (

		<Container size={420} my={20}>
			<Title
				align="center"
				sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily!}`, fontWeight: 900 })}
			>
				Welcome back!
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Do not have an account yet?{' '}
				<Link to="/auth/signup">
					<Anchor size="sm" component="button">
						Create account
					</Anchor></Link>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.onSubmit((values) => {
					console.log('values: ', values);

				})}>

					<TextInput label="Email" placeholder="mail@qridwan.com" required {...form.getInputProps('email')} />
					<PasswordInput label="Password" placeholder="Your password" required mt="md"  {...form.getInputProps('password')} />
					<Group position="apart" mt="lg">
						<Anchor component="button" size="sm" >
							Forgot password?
						</Anchor>
					</Group>
					<Button fullWidth gradient={{ from: 'indigo', to: 'cyan' }} mt="xl" color='cyan' type='submit' >
						Sign in
					</Button>
				</form>
			</Paper>
		</Container>
	);
}