import { useState } from 'react';
import {
	createStyles,
	Container,
	Avatar,
	UnstyledButton,
	Group,
	Text,
	Menu,
	Burger,
	rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
	IconLogout,
	IconHeart,
	IconStar,
	IconMessage,
	IconSettings,
	IconTrash,

	IconChevronDown,
} from '@tabler/icons-react';
import { Outlet } from 'react-router-dom'
// import { MantineLogo } from '@mantine/ds';
import BrandLogo from '../atoms/BrandLogo';

const useStyles = createStyles((theme) => ({
	header: {
		paddingTop: theme.spacing.sm,
		backgroundColor: theme.colors.cyan,
		borderBottom: theme.colors.yellow,
		marginBottom: rem(10),
	},

	mainSection: {
		paddingBottom: theme.spacing.sm,
	},

	user: {
		color: theme.colors.yellow,
		padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',

		'&:hover': {
			// backgroundColor: theme.fn.lighten(
			// 	theme.fn.variant({ variant: 'filled', }).background!,
			// 	0.1
			// ),
		},

		[theme.fn.smallerThan('xs')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('xs')]: {
			display: 'none',
		},
	},

	userActive: {
		// backgroundColor: theme.fn.lighten(
		// 	theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
		// 	0.1
		// ),
	},

	tabs: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	tabsList: {
		borderBottom: '0 !important',
	},

	tab: {
		fontWeight: 500,
		height: rem(38),
		color: theme.white,
		backgroundColor: 'transparent',
		borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,

		'&:hover': {
			// backgroundColor: theme.fn.lighten(
			// 	theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
			// 	0.1
			// ),
		},

		'&[data-active]': {
			// backgroundColor: theme.fn.lighten(
			// 	theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
			// 	0.1
			// ),
			borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
		},
	},
}));

interface HeaderTabsProps {
	user: { name: string; image: string };
	tabs: string[];
}

const DemoData = {
	user: {
		name: "Ridwan Alam",
		image: "none"
	},
	tabs: ["Home", "Horror", "Mystery"]
}
export function MainLayout() {
	const { user }: HeaderTabsProps = DemoData;
	const { classes, theme, cx } = useStyles();
	const [opened, { toggle }] = useDisclosure(false);
	const [userMenuOpened, setUserMenuOpened] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const items = tabs.map((tab) => (
	// 	<Tabs.Tab value={tab} key={tab}>
	// 		{tab}
	// 	</Tabs.Tab>
	// ));

	return (
		<>
			<div className={classes.header}>
				<Container className={classes.mainSection}>
					<Group position="apart">
						<BrandLogo />

						<Burger
							opened={opened}
							onClick={toggle}
							className={classes.burger}
							size="sm"
						// color={theme.white}
						/>

						<Menu
							width={260}
							position="bottom-end"
							transitionProps={{ transition: 'pop-top-right' }}
							onClose={() => setUserMenuOpened(false)}
							onOpen={() => setUserMenuOpened(true)}
							withinPortal
						>
							<Menu.Target>
								<UnstyledButton
									className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
								>
									<Group spacing={7}>
										<Avatar src={user.image} alt={user.name} radius="xl" size={20} />
										<Text weight={500} size="sm" sx={{ lineHeight: 1, color: theme.white }} mr={3}>
											{user.name}
										</Text>
										<IconChevronDown size={rem(12)} stroke={1.5} />
									</Group>
								</UnstyledButton>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item
									icon={<IconHeart size="0.9rem" stroke={1.5} color={theme.colors.red[6]} />}
								>
									Watch List
								</Menu.Item>
								<Menu.Item
									icon={<IconStar size="0.9rem" stroke={1.5} color={theme.colors.yellow[6]} />}
								>
									Currently Reading
								</Menu.Item>
								<Menu.Item
									icon={<IconMessage size="0.9rem" stroke={1.5} color={theme.colors.blue[6]} />}
								>
									Your Reviews
								</Menu.Item>

								<Menu.Label>Settings</Menu.Label>
								<Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
									Account settings
								</Menu.Item>

								<Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>Logout</Menu.Item>

								<Menu.Divider />

								<Menu.Label>Danger zone</Menu.Label>
								{/* <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>
									Pause subscription
								</Menu.Item> */}
								<Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
									Delete account
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
				</Container>
				{/* <Container>
					<Tabs
						defaultValue="Home"
						variant="outline"
						classNames={{
							root: classes.tabs,
							tabsList: classes.tabsList,
							tab: classes.tab,
						}}
					>
						<Tabs.List>{items}</Tabs.List>
					</Tabs>
				</Container> */}
			</div>

			<Outlet />
		</>

	);
}