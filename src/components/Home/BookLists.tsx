import { Grid } from '@mantine/core';
import { SignleBook } from './SingleBook';
import { BookType } from '../../types/book';
import { Books } from './_staticData';

const BookLists = () => {
	return (
		<Grid>
			{
				Books.map((book: BookType) => <Grid.Col span={4}>
					<SignleBook item={book} />
				</Grid.Col>)
			}
		</Grid>
	);
};

export default BookLists;