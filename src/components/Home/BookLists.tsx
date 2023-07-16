import { Grid, Text } from '@mantine/core';
import { SingleBook } from './SingleBook';
import { BookType } from '../../types/book';
import BoiLoader from '../../atoms/Loader';
import { SingleBookList } from '../List/SingleBookList';

const BookLists = ({ type, books, isLoading }: { type: string, books: BookType[] | any, isLoading: boolean }) => {

	return (
		<Grid justify='center'>
			{
				isLoading ? <BoiLoader /> : books?.length > 0 ? books.map((book: any) => <Grid.Col key={book.id} span={type == 'all' ? 4 : 3}>
					{type !== "list" ? <SingleBook book={book} /> : <SingleBookList book={book} />}
				</Grid.Col>) : <Text>No Books Found!</Text>
			}
		</Grid>
	);
};

export default BookLists;