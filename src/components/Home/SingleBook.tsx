import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import {
	Card,
	Image,
	Text,
	ActionIcon,
	Badge,
	Group,
	Center,
	Avatar,
	createStyles,
	rem,
	Box,
} from '@mantine/core';
import { BookType } from '../../types/book';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
	card: {
		position: 'relative',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	rating: {
		position: 'absolute',
		top: theme.spacing.xs,
		right: rem(12),
		pointerEvents: 'none',
	},

	title: {
		display: 'block',
		marginTop: theme.spacing.md,
		marginBottom: rem(5),
		color: "white",
		// textDecoration: '0',
	},

	action: {
		// backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		// ...theme.fn.hover({
		// 	backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
		// }),
	},

	footer: {
		marginTop: theme.spacing.xs,
	},
}));



export function SingleBook({ book }: { book: BookType }) {
	const { classes, cx, theme } = useStyles();
	const { title, author, publication, createdAt, id, genre } = book;


	return (
		<Card withBorder radius="md" className={cx(classes.card)} >
			<Link to={`/book/${id as string}`}>	<Card.Section mt={-20}>
				<Box sx={{ height: 100, width: '100%', background: '#0B7285', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
					<Text className={classes.title} fw={700} >
						{title}
					</Text>
				</Box>
			</Card.Section>
			</Link>

			<Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
				{genre}
			</Badge>



			{/* <Text fz="sm" color="dimmed" lineClamp={2}>
				{description}
			</Text> */}

			<Group className={classes.footer}>
				<Center>
					<Avatar size={24} radius="xl" color='cyan' mr="xs" >
						{author?.split(' ')[0].slice(0, 1) + author?.split(' ')[1]?.slice(0, 1)}
					</Avatar>
					<Text fz="sm" inline>
						{author}
					</Text>

				</Center>
				<Text fz="sm" inline>
					Publication: {publication}
				</Text>

				{/* <Group spacing={8} mr={0}>
					<ActionIcon className={classes.action}>
						<IconHeart size="1rem" color={theme.colors.red[6]} />
					</ActionIcon>
					<ActionIcon className={classes.action}>
						<IconBookmark size="1rem" color={theme.colors.yellow[7]} />
					</ActionIcon>

				</Group> */}
			</Group>
		</Card >
	);
}