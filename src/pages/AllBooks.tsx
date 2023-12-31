import {
  ActionIcon,
  Button,
  Container,
  Grid,
  Loader,
  Modal,
  ScrollArea,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { SearchArea } from "../components/Home/SearchArea";
import Filters from "../components/Home/Filters";
import BookLists from "../components/Home/BookLists";
import { useDisclosure } from "@mantine/hooks";
import AddBook from "../components/Home/AddBook";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { useAppSelector } from "../redux/hook";

const AllBooks = () => {
  const [value, setValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [yearValue, setYearValue] = useState<Date | null>(null);
  const [genreValue, setGenreValue] = useState<string>("");
  const { data: allBooks, isLoading } = useGetBooksQuery(
    {
      searchTerm: searchTerm,
      genre: genreValue,
      publication: yearValue?.getFullYear()?.toString(),
    },
    { refetchOnMountOrArgChange: true }
  );
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Container size="lg" px="xs">
      <Grid>
        {/* TOP */}
        <Modal
          size="calc(100vw - 60vw)"
          opened={opened}
          onClose={close}
          title=""
          centered
        >
          <AddBook />
        </Modal>

        {/* MAIN PART */}
        <Grid.Col span={9}>
          <Grid align="center" justify="center" my={10}>
            <Grid.Col span={8}>
              <SearchArea
                value={value}
                onChange={(event) => {
                  setValue(event.currentTarget.value);
                  if (event.currentTarget.value === "") {
                    setSearchTerm("");
                  }
                }}
                rightSection={
                  <ActionIcon
                    disabled={isLoading}
                    onClick={() => {
                      setSearchTerm(value);
                    }}
                    size={32}
                    radius="xl"
                    color={theme.primaryColor}
                    variant="filled"
                  >
                    {!isLoading ? (
                      <IconArrowRight size="1.1rem" stroke={1.5} />
                    ) : (
                      <Loader size="xs" color="white" />
                    )}
                  </ActionIcon>
                }
              />
            </Grid.Col>
            <Grid.Col span={4}>
              {user?.fullName && (
                <Tooltip label="Add New Book">
                  <Button
                    variant="outline"
                    style={{
                      color: "#5f3dc4",
                      fontSize: 14,
                      borderColor: "#5f3dc4",
                    }}
                    onClick={open}
                  >
                    Add New Book
                  </Button>
                </Tooltip>
              )}
            </Grid.Col>
          </Grid>
          <ScrollArea h={{ md: 500, lg: 550 }} type="never">
            <Text
              sx={(theme) => ({
                fontFamily: `Merienda, ${theme.fontFamily!}`,
              })}
              fz="xl"
              fw={700}
              my={30}
              inline
            >
              All Books
            </Text>
            <BookLists
              type={"all"}
              books={allBooks?.data}
              isLoading={isLoading}
            />
          </ScrollArea>
        </Grid.Col>
        {/* SIDEBAR */}
        <Grid.Col span={3} mt={50}>
          {/* <Blockquote cite="– Forrest Gump">
						Life is like an npm install – you never know what you are going to get.
					</Blockquote> */}
          <Grid.Col span={12}>
            <Filters
              yearValue={yearValue}
              setGenreValue={setGenreValue}
              setYearValue={setYearValue}
            />
          </Grid.Col>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default AllBooks;
