/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Card,
	Image,
	Text,
	ActionIcon,
	Badge,
	Group,

	Avatar,
	createStyles,

	Container,
	Grid,

	Flex,
	Textarea,
	Divider,
	Button,
} from '@mantine/core';
import { IconBookmark, IconHeart } from '@tabler/icons-react';
import { reviews } from '../components/BookDetails/_mockData';
import Review from '../components/BookDetails/Review';
import IReview from '../types/review';
import { hasLength, useForm } from '@mantine/form';
const useStyles = createStyles(() => ({
}));
const BookDetails = () => {
	const form = useForm({
		initialValues: {
			review: '',
		},
		validate: {
			// email: isEmail('Invalid email'),
			review: hasLength({ min: 1, max: 500 }, 'Invalid Review'),
		},
	});
	// props: BookType
	const demo = {
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrBstXAmkzVK-Ze6Lg_gZMVl57-7Oyvpw6QA&usqp=CAU",
		link: "id",
		title: "Resident Evil Village review",
		rating: "outstanding",
		description:
			"Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires. Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.",
		author: {
			name: "Bill Wormeater",
			image:
				"https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
		},
	}
	const { rating, title, author, description, image } = demo;
	const { theme } = useStyles();
	return (
		<Container size={'md'}>
			<Grid>
				<Grid.Col span={4}>
					<Card.Section sx={{ display: "flex", justifyContent: "center" }}>

						<Image src={image} height={250} width={200} />

					</Card.Section>
				</Grid.Col>
				<Grid.Col span={8}
				>
					<Flex direction={'row'} align={'center'}>
						<Avatar size={24} radius="xl" mr="xs" color='cyan' >

							{author.name.split(' ')[0].slice(0, 1) + author.name?.split(' ')[1]?.slice(0, 1)}
						</Avatar>
						<Text fz="sm" inline>
							{author.name}
						</Text>
						<Badge ml={10} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
							{rating}
						</Badge>
					</Flex>
					<Text fw={500} component="h2" >
						{title}
					</Text>

					<Text fz="xs"  >
						{description}
					</Text>
				</Grid.Col>
			</Grid>
			<Group position="right" >
				<Group spacing={8} mr={0} position='right'>
					<ActionIcon >

					</ActionIcon>
					<ActionIcon >
						<IconHeart size="1rem" color={theme.colors.red[6]} />
					</ActionIcon>
					<ActionIcon >
						<IconBookmark size="1rem" color={theme.colors.yellow[7]} />
					</ActionIcon>

				</Group>
			</Group>

			<Container size={'xs'} mb={20}>
				<form onSubmit={form.onSubmit((values) => {
					console.log('values: ', values);

				})}>
					<Grid align='end'>
						<Grid.Col span={10}>

							<Textarea
								required {...form.getInputProps('review')}
								placeholder="Your review"
								label="Add Review"
								withAsterisk
							/>
						</Grid.Col>
						<Grid.Col span={2}>
							<Button type='submit'>
								Save
							</Button>
						</Grid.Col>
					</Grid>
					<Divider my={10} />
					{
						reviews.map((review: IReview) => <Review postedAt={review.postedAt} body={review.body} author={review.author} />)
					}

				</form>
			</Container>
		</Container>
	);
};

export default BookDetails;