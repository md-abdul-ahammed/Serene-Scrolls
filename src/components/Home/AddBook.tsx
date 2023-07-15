import { hasLength, isEmail, useForm } from '@mantine/form';
import {
	TextInput,
	Paper,
	Text,
	Container,
	Button, Image, SimpleGrid, Box
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { useState } from 'react';

const AddBook = () => {

	const [files, setFiles] = useState<FileWithPath[]>([]);

	const previews = files.map((file, index) => {
		const imageUrl = URL.createObjectURL(file);
		return (
			<Image
				key={index}
				src={imageUrl}
				imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
			/>
		);
	});
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
		<div>
			<Container size={420} my={20}>


				<Paper withBorder shadow="md" p={10} mt={10} radius="md">
					<form onSubmit={form.onSubmit((values) => {
						console.log('values: ', values);

					})}>

						<TextInput label="Book Name/ Title" placeholder="Think and Grow Rich" required {...form.getInputProps('title')} />
						<TextInput label="Genre" placeholder=" Horror/Romantic" required {...form.getInputProps('genre')} />

						<Box my={10}>
							<Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
								<Text align="center">Drop the book image</Text>
							</Dropzone>

							<SimpleGrid
								cols={4}
								breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
								mt={previews.length > 0 ? 'xl' : 0}
							>
								{previews}
							</SimpleGrid>
						</Box>

						<Button fullWidth gradient={{ from: 'indigo', to: 'cyan' }} mt="xl" color='cyan' type='submit' >
							SAVE
						</Button>
					</form>
				</Paper>
			</Container>
		</div>
	);
};

export default AddBook;