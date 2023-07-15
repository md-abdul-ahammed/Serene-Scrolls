import { createStyles, Text, Avatar, Group, rem, Card } from '@mantine/core';
import IReview from '../../types/review';

const useStyles = createStyles((theme) => ({
	body: {
		paddingLeft: rem(54),
		paddingTop: theme.spacing.sm,
	},
}));




const Review = ({ postedAt, body, author }: IReview) => {
	const { classes } = useStyles();
	return (
		<Card shadow="xs" my={10}>
			<Group mb={-10}>
				<Avatar src={author.image} alt={author.name} radius="xl" />
				<div>
					<Text size="xs" >{author.name}</Text>
					<Text size="xs" >
						{postedAt}
					</Text>
				</div>
			</Group>
			<Text className={classes.body} color="dimmed" size="xs">
				{body}
			</Text>
		</Card>
	);
};

export default Review;