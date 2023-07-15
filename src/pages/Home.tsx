import { Button, Container, Grid, Modal, ScrollArea, Tooltip } from '@mantine/core';
import { SearchArea } from '../components/Home/SearchArea';
import Filters from '../components/Home/Filters';
import BookLists from '../components/Home/BookLists';
import { useDisclosure } from '@mantine/hooks';
import AddBook from '../components/Home/AddBook';

const Home = () => {

	const [opened, { open, close }] = useDisclosure(false);
	return (
		<Container size="lg" px="xs">
			<Grid>
				{/* TOP */}
				<Modal opened={opened} onClose={close} title="Add New Book" centered>
					<AddBook />
				</Modal>


				{/* MAIN PART */}
				<Grid.Col span={9}>
					<Grid align='end' justify='center' my={10} >
						<Grid.Col span={8}>
							<SearchArea />
						</Grid.Col>
						<Grid.Col span={4}>
							<Tooltip label="Add New Book">
								<Button variant="outline" color='cyan' onClick={open}>Add New Book</Button>
							</Tooltip>
						</Grid.Col>
					</Grid>
					<ScrollArea h={{ md: 500, lg: 750 }} type="never" >
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

				</Grid.Col>
			</Grid >
		</Container >
	);
};

export default Home;