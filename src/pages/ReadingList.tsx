import {
  Button,
  Container,
  Grid,
  Modal,
  ScrollArea,
  Text,
} from "@mantine/core";

import BookLists from "../components/Home/BookLists";
import { useDisclosure } from "@mantine/hooks";
import AddBook from "../components/Home/AddBook";
import { createStyles, Title, rem } from "@mantine/core";
import { Dots } from "../atoms/Dots";
import { useNavigate } from "react-router-dom";
import { useGetReadingListQuery } from "../redux/features/personalList/listApi";

const ReadingList = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: allReadingList, isLoading } = useGetReadingListQuery({});

  return (
    <Container size="lg" px="xs">
      <Grid>
        {/* TOP */}
        <Modal opened={opened} onClose={close} title="Add New Book" centered>
          <AddBook />
        </Modal>

        {/* MAIN PART */}
        <Grid.Col span={12}>
          <Grid align="end" justify="center" my={10}>
            <Container className={classes.wrapper} size={1400}>
              <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
              <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
              <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
              <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

              <div className={classes.inner}>
                <Title className={classes.title}>
                  <Text component="span" className={classes.highlight} inherit>
                    Currently Reading
                  </Text>
                </Title>

                <div className={classes.controls}>
                  <Button
                    className={classes.control}
                    onClick={() => navigate("/all")}
                    size="lg"
                    variant="default"
                    color="gray"
                  >
                    See all books
                  </Button>
                  <Button onClick={open} className={classes.control} size="lg">
                    Add New Book
                  </Button>
                </div>
              </div>
            </Container>
          </Grid>
          <ScrollArea h={{ md: 400, lg: 450 }} type="never">
            <Text
              fs={"revert"}
              sx={{ fontSize: 25, textAlign: "center" }}
              fw={700}
              my={30}
              inline
            >
              Reading List
            </Text>
            <BookLists
              type="list"
              books={allReadingList?.data}
              isLoading={isLoading}
            />
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ReadingList;

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(120),
    paddingBottom: rem(80),

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Merienda, ${theme.fontFamily!}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("xs")]: {
      height: rem(42),
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));
