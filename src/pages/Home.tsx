import { Blockquote, Button, Container, Grid, ScrollArea, Tooltip } from '@mantine/core';
import React from 'react';
import { SearchArea } from '../components/Home/SearchArea';
import Filters from '../components/Home/Filters';
import BookLists from '../components/Home/BookLists';

const Home = () => {
	return (
		<Container size="lg" px="xs">
			<Grid>
				{/* TOP */}




				{/* MAIN PART */}
				<Grid.Col span={9}>
					<Grid align='end' justify='center' my={10}>
						<Grid.Col span={8}>
							<SearchArea />
						</Grid.Col>

					</Grid>
					<ScrollArea styles={(theme) => ({
						width: "100%",
						scrollbar: {
							'&, &:hover': {
								background:
									theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
							},

							'&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
								backgroundColor: theme.colors.cyan,
							},

							'&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
								display: 'none'
							},
						},

						corner: {
							opacity: 1,
							background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
						},
					})} h={500} type="never" >

						<BookLists />
					</ScrollArea>
				</Grid.Col>
				{/* SIDEBAR */}
				<Grid.Col span={3} mt={50}>
					{/* <Blockquote cite="– Forrest Gump">
						Life is like an npm install – you never know what you are going to get.
					</Blockquote> */}
					<Grid.Col span={12}>
						<Filters />
					</Grid.Col>
					<Tooltip label="Add New Book">
						<Button variant="outline" color='cyan'>Add Book</Button>
					</Tooltip>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default Home;