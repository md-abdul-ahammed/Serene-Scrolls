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
	Tooltip,
} from '@mantine/core';
import { IconBookmark, IconHeart } from '@tabler/icons-react';
import { reviews } from '../components/BookDetails/_mockData';
import Review from '../components/BookDetails/Review';
import IReview from '../types/review';
import { hasLength, useForm } from '@mantine/form';
import { useAddReviewMutation, useGetReviewsQuery, useSingleBookQuery } from '../redux/features/books/bookApi';
import { useParams } from 'react-router-dom';
import { BookType } from '../types/book';
import { useAppSelector } from '../redux/hook';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
const useStyles = createStyles(() => ({
}));
const BookDetails = () => {
	const { id: bookId } = useParams();
	const { data } = useSingleBookQuery(bookId as string);
	const { data: allreviews } = useGetReviewsQuery(bookId as string);
	const { user } = useAppSelector(state => state.auth)
	const [addReview, { isLoading }] = useAddReviewMutation();


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

	const { genre, title, author, publication, createdAt, id, addedBy }: BookType = data?.data || {};
	const { theme } = useStyles();
	return (
		<Container size={'md'}>
			<Grid>
				<Grid.Col span={4}>
					<Card.Section sx={{ display: "flex", justifyContent: "center" }}>

						<Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrBstXAmkzVK-Ze6Lg_gZMVl57-7Oyvpw6QA&usqp=CAU" height={250} width={200} />

					</Card.Section>
				</Grid.Col>
				<Grid.Col span={8}
				>
					<Flex direction={'row'} align={'center'}>
						<Avatar size={24} radius="xl" mr="xs" color='cyan' >

							{author?.split(' ')[0].slice(0, 1) + author?.split(' ')[1]?.slice(0, 1)}
						</Avatar>
						<Text fz="lg" inline>
							{author}
						</Text>
						<Badge ml={10} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
							{genre}
						</Badge>
					</Flex>
					<Text fw={500} fz="xl" my={20} >
						{title}
						<Text fz="xs"   >
							Published On: {publication}
							<br />

						</Text>
					</Text>


					<Text fz="xs"  >
						Added By: {addedBy?.fullName}
						<br />
						Email ID: {addedBy?.email}

					</Text>
				</Grid.Col>
			</Grid>
			<Group position="right" >
				<Group spacing={8} mr={0} position='right'>

					<ActionIcon >
						<Tooltip label="Add to wishlist">

							<IconHeart size="1rem" color={theme.colors.red[6]} />
						</Tooltip>
					</ActionIcon>
					<ActionIcon >
						<Tooltip label="Add to currently reading">

							<IconBookmark size="1rem" color={theme.colors.yellow[7]} />
						</Tooltip>
					</ActionIcon>

				</Group>
			</Group>

			<Container size={'xs'} mb={20}>
				<form onSubmit={form.onSubmit(async (values): void => {
					const formData = {

						review: values.review,
						bookId: bookId,
						reviewerId: user?.id
					}

					const res = await addReview(formData as {
						review: string;
						bookId: string;
						reviewerId: string;
					});
					notifications.show({
						id: 'success-login',
						withCloseButton: true,
						onClose: () => console.log('unmounted'),
						onOpen: () => console.log('mounted'),
						autoClose: 3000,
						title: res?.data?.statusCode === 200 ? "Review Added" : "Operation Failed",
						message: res?.data?.statusCode === 200 ? res.data?.message : res?.error?.data.message,
						color: res?.data?.statusCode === 200 ? 'cyan' : 'red',
						icon: <IconX />,
						className: 'my-notification-class',
						style: { backgroundColor: '' },
						sx: { backgroundColor: 'white' },
						loading: false,
					});


					res?.data?.statusCode === 200 && form.reset();
					console.log('formData: ', formData);


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
							<Button disabled={isLoading} type='submit'>
								Save
							</Button>
						</Grid.Col>
					</Grid>
					<Divider my={10} />
					{
						allreviews?.data?.map((review: IReview) => <Review createdAt={review.createdAt} review={review.review} author={review.reviewerId.fullName} />)
					}

				</form>
			</Container>
		</Container>
	);
};

export default BookDetails;

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