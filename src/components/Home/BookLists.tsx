import { Grid, Text } from '@mantine/core';
import { SingleBook } from './SingleBook';
import { BookType } from '../../types/book';
import BoiLoader from '../../atoms/Loader';

const BookLists = ({ type, books, isLoading }: { type: string, books: BookType[], isLoading: boolean }) => {

	return (
		<Grid justify='center'>
			{
				isLoading ? <BoiLoader /> : books.length > 0 ? books.map((book: BookType) => <Grid.Col span={type == 'all' ? 4 : 3}>
					<SingleBook book={book} />
				</Grid.Col>) : <Text>No Books Found!</Text>
			}
		</Grid>
	);
};

export default BookLists;