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
} from '@mantine/core';
import { BookType } from '../../types/book';

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
	},

	action: {
		// backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		// ...theme.fn.hover({
		// 	backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
		// }),
	},

	footer: {
		marginTop: theme.spacing.md,
	},
}));



export function SingleBook({
	className,
	image,
	link,
	title,
	description,
	author,
	rating,
	...others
}: BookType & Omit<React.ComponentPropsWithoutRef<'div'>, keyof BookType>) {
	const { classes, cx, theme } = useStyles();
	const linkProps = { href: `book/${link}`, rel: 'noopener noreferrer' };

	return (
		<Card withBorder radius="md" className={cx(classes.card, className)} {...others}>
			<Card.Section>
				<a {...linkProps}>
					<Image src={image} height={180} />
				</a>
			</Card.Section>

			<Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
				{rating}
			</Badge>

			<Text className={classes.title} fw={500} component="a" {...linkProps}>
				{title}
			</Text>

			<Text fz="sm" color="dimmed" lineClamp={2}>
				{description}
			</Text>

			<Group position="apart" className={classes.footer}>
				<Center>
					<Avatar size={24} radius="xl" color='cyan' mr="xs" >
						{author.name.split(' ')[0].slice(0, 1) + author.name?.split(' ')[1]?.slice(0, 1)}
					</Avatar>
					<Text fz="sm" inline>
						{author.name}
					</Text>
				</Center>

				<Group spacing={8} mr={0}>
					<ActionIcon className={classes.action}>
						<IconHeart size="1rem" color={theme.colors.red[6]} />
					</ActionIcon>
					<ActionIcon className={classes.action}>
						<IconBookmark size="1rem" color={theme.colors.yellow[7]} />
					</ActionIcon>
					<ActionIcon className={classes.action}>
						<IconShare size="1rem" />
					</ActionIcon>
				</Group>
			</Group>
		</Card>
	);
}