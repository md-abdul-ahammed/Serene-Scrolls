import {
	TextInput,
	PasswordInput,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Button,
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { Link } from "react-router-dom";

export default function SignUp() {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			fullName: '',
			remember: false
		},
		validate: {
			email: isEmail('Invalid email'),
			password: hasLength({ min: 5, max: 10 }, 'Password must be at least 5-10 characters long'),
		},
	});

	return (
		<Container size={420} my={40}>
			<Title
				align="center"
				sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily!}`, fontWeight: 900 })}
			>
				Create New Account
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Already have an account?{' '}
				<Link to="/auth/login">
					<Anchor size="sm" component="button">
						Login
					</Anchor></Link>
			</Text>
			<form onSubmit={form.onSubmit((values) => {
				console.log('values: ', values);

			})}>
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">

					<TextInput label="Full Name" placeholder="Ridwan A." required {...form.getInputProps('fullName')} />
					<TextInput label="Email" mt={10} placeholder="mail@qridwan.com" required {...form.getInputProps('email')} />

					<PasswordInput label="Password" placeholder="Your password" required mt="md"  {...form.getInputProps('password')} />

					<Button fullWidth gradient={{ from: 'indigo', to: 'cyan' }} mt="xl" color='cyan' type='submit' >
						Submit
					</Button>
				</Paper>
			</form>
		</Container>
	);
}