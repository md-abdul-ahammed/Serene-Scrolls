import { Grid } from '@mantine/core';
import { SingleBook } from './SingleBook';
import { BookType } from '../../types/book';
import { Books } from './_staticData';

const BookLists = () => {
	return (
		<Grid>
			{
				Books.map((book: BookType) => <Grid.Col span={4}>
					<SingleBook description={book.description} image={book.image} author={book.author} rating={book.rating} link={book.link} title={book.title} />
				</Grid.Col>)
			}


		</Grid>
	);
};

export default BookLists;