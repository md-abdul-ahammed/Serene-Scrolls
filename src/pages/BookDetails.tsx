/* eslint-disable @typescript-eslint/no-misused-promises */
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
	Dialog,
} from '@mantine/core';
import { IconBookFilled, IconBookmark, IconHeart, IconHeartFilled, IconTrashX } from '@tabler/icons-react';
import Review from '../components/BookDetails/Review';
import IReview from '../types/review';
import { hasLength, useForm } from '@mantine/form';
import { useAddReviewMutation, useDeleteBookMutation, useGetReviewsQuery, useSingleBookQuery } from '../redux/features/books/bookApi';
import { useNavigate, useParams } from 'react-router-dom';
import { BookType } from '../types/book';
import { useAppSelector } from '../redux/hook';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useAddReadingListMutation, useAddWishListMutation, useDeleteReadingMutation, useDeleteWishlistMutation, useGetReadingListQuery, useGetWishlistQuery } from '../redux/features/personalList/listApi';
import { useEffect, useState } from 'react';
import { IconTrashFilled } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';



const useStyles = createStyles(() => ({
}));


const BookDetails = () => {
	const { id: bookId } = useParams();
	const [opened, { toggle, close }] = useDisclosure(false);
	const { data } = useSingleBookQuery(bookId as string);
	const [isWish, setIsWish] = useState<any>(null);
	const [isReading, setIsReading] = useState<any>(null);
	const { data: allreviews } = useGetReviewsQuery(bookId as string);
	const { user } = useAppSelector(state => state.auth)
	const [addReview, { isLoading }] = useAddReviewMutation();
	const [addWishlist] = useAddWishListMutation();
	const [addReadingList] = useAddReadingListMutation();
	const [deleteWishlist] = useDeleteWishlistMutation();
	const [deleteReading] = useDeleteReadingMutation();
	const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
	const navigate = useNavigate();

	const handleDeleteBook = async (): Promise<void> => {
		const res: any = await deleteBook(bookId as string);
		console.log('res: ', res);
		notifications.show({
			id: 'success-login',
			withCloseButton: true,
			onClose: () => console.log('unmounted'),
			onOpen: () => console.log('mounted'),
			autoClose: 3000,
			title: res?.data?.statusCode === 200 ? "Book Deleted" : "Operation Failed",
			message: res?.data?.statusCode === 200 ? res.data?.message : res?.error?.data.message,
			color: res?.data?.statusCode === 200 ? 'cyan' : 'red',
			icon: <IconX />,
			className: 'my-notification-class',
			style: { backgroundColor: '' },
			sx: { backgroundColor: 'white' },
			loading: false,
		});
		close();// closing dialog
		res?.data?.statusCode === 200 && navigate('/');
		return Promise.resolve();
	}

	const { data: allWishlist } = useGetWishlistQuery({});
	const { data: allReadinglist } = useGetReadingListQuery({});

	useEffect(() => {

		const isWishListed = allWishlist?.data.find((item: any) => item.bookId.id === bookId)
		const isReadingListed = allReadinglist?.data.find((item: any) => item.bookId.id === bookId)

		if (isWishListed) {
			setIsWish(isWishListed)
		}
		if (isReadingListed) {
			setIsReading(isReadingListed)
		}
	}, [allWishlist, allReadinglist])
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

					<ActionIcon onClick={async (): Promise<void> => {
						if (!isWish) {
							const res = await addWishlist({ bookId, userId: user?.id });

							res?.data.statusCode === 200 && setIsWish(res?.data?.data)
						} else {
							const res = await deleteWishlist(isWish.id as string);
							res?.data.statusCode === 200 && setIsWish(null)
						}
						return Promise.resolve(); // Return a resolved Promise with void
					}}

					>
						<Tooltip label={isWish ? "Remove from wishlist" : "Add to wishlist"}>

							{isWish ? <IconHeartFilled size="1rem" color={'red'} /> : <IconHeart size="1rem" color={theme.colors.red[6]} />}
						</Tooltip>
					</ActionIcon>
					<ActionIcon onClick={async (): Promise<void> => {
						if (!isReading) {
							const res: any = await addReadingList({ bookId, userId: user?.id });

							res?.data.statusCode === 200 && setIsReading(res?.data?.data)
						} else {
							const res: any = await deleteReading(isReading.id as string);
							res?.data.statusCode === 200 && setIsReading(null)
						}
						return Promise.resolve(); // Return a resolved Promise with void
					}}>
						<Tooltip label={isReading ? "Remove from currently reading" : "Add to currently reading"}>

							{isReading ? <IconBookFilled size="1rem" color={theme.colors.yellow[6]} /> : <IconBookmark size="1rem" color={theme.colors.yellow[7]} />}
						</Tooltip>
					</ActionIcon>

					{
						(user?.id === addedBy?.id) && <ActionIcon onClick={async (): Promise<void> => {
							toggle();
							return Promise.resolve(); // Return a resolved Promise with void
						}}>
							<Tooltip label={isReading ? "Remove from currently reading" : "Add to currently reading"}>

								<IconTrashFilled size="1rem" color={theme.colors.red[6]} />
							</Tooltip>
						</ActionIcon>
					}

				</Group>
			</Group>

			<Container size={'xs'} mb={20}>
				<form onSubmit={form.onSubmit(async (values): Promise<void> => {
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
					return Promise.resolve();


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

			{/* //confirm message for delete book: */}

			<Dialog position={{ top: 20, right: 20 }} opened={opened} withCloseButton onClose={close} size="lg" radius="md">
				<Text size="sm" mb="xs" weight={500}>
					Are you sure to delete the book?
				</Text>

				<Group align="flex-end">
					<Button onClick={handleDeleteBook} color='red' disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'DELETE'}</Button>
				</Group>
			</Dialog>
		</Container>
	);
};

export default BookDetails;


