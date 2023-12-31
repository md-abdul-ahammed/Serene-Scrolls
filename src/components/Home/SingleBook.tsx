import {
  Card,
  Text,
  Badge,
  Group,
  Center,
  Avatar,
  createStyles,
  rem,
  Box,
} from "@mantine/core";
import { BookType } from "../../types/book";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
    color: "#4e359e",
    fontWeight: "bold",
    fontSize: "18px",
  },

  action: {
    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    // ...theme.fn.hover({
    // 	backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    // }),
  },

  footer: {
    marginTop: theme.spacing.xs,
  },
}));

export function SingleBook({ book }: { book: BookType }) {
  const { classes, cx } = useStyles();
  const { title, author, publication, id, genre } = book;

  return (
    <Card withBorder radius="md" className={cx(classes.card)}>
      <Link style={{ textDecoration: "none" }} to={`/book/${id as string}`}>
        {" "}
        <Card.Section mt={-20}>
          <Box
            sx={{
              height: 150,
              width: "100%",
              background: "#efeffe",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              sx={(theme) => ({
                fontFamily: `Merienda, ${theme.fontFamily!}`,
                fontWeight: 900,
                fontSize: 20,
                textAlign: "center",
              })}
              className={classes.title}
            >
              {title}
            </Text>
          </Box>
        </Card.Section>
      </Link>

      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{ from: "#6f4cdf", to: "#4e359e" }}
      >
        {genre}
      </Badge>

      {/* <Text fz="sm" color="dimmed" lineClamp={2}>
				{description}
			</Text> */}

      <Group className={classes.footer}>
        <Center>
          <Avatar size={24} radius="xl" color="violet" mr="xs">
            {author?.split(" ")[0].slice(0, 1) +
              author?.split(" ")[1]?.slice(0, 1)}
          </Avatar>
          <Text
            sx={(theme) => ({
              fontFamily: `Merienda, ${theme.fontFamily!}`,
              fontSize: 14,
            })}
            fw={500}
            inline
          >
            {author}
          </Text>
        </Center>
        <Text
          sx={(theme) => ({
            fontFamily: `Merienda, ${theme.fontFamily!}`,
            fontSize: 14,
          })}
          color="#302f2fc7"
          fz="sm"
          inline
        >
          Publication: {publication}
        </Text>

        {/* <Group spacing={8} mr={0}>
					<ActionIcon className={classes.action}>
						<IconHeart size="1rem" color={theme.colors.red[6]} />
					</ActionIcon>
					<ActionIcon className={classes.action}>
						<IconBookmark size="1rem" color={theme.colors.yellow[7]} />
					</ActionIcon>

				</Group> */}
      </Group>
    </Card>
  );
}
