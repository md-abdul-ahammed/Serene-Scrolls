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
	Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
	IconLogout,
	IconHeart,
	IconStar,
	IconMessage,
	IconSettings,

	IconChevronDown,
} from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom'
// import { MantineLogo } from '@mantine/ds';
import BrandLogo from '../atoms/BrandLogo';
import Footer from '../components/shared/Footer';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { userLoggedOut } from '../redux/features/auth/authSlice';

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

export function MainLayout() {
	const { user } = useAppSelector(state => state.auth);
	const { classes, theme, cx } = useStyles();
	const [opened, { toggle }] = useDisclosure(false);
	const [userMenuOpened, setUserMenuOpened] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const items = tabs.map((tab) => (
	// 	<Tabs.Tab value={tab} key={tab}>
	// 		{tab}
	// 	</Tabs.Tab>
	// ));
	const logout = () => {
		dispatch(userLoggedOut());
		localStorage.clear();
	};

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

						{user?.fullName ? <Menu
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
										<Avatar radius="xl" size={20} />
										<Text weight={500} size="sm" sx={{ lineHeight: 1, color: theme.white }} mr={3}>
											{user?.fullName}
										</Text>
										<IconChevronDown size={rem(12)} stroke={1.5} />
									</Group>
								</UnstyledButton>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item
									onClick={() => navigate('/watchlist')}
									icon={<IconHeart size="0.9rem" stroke={1.5} color={theme.colors.red[6]} />}
								>
									Watch List
								</Menu.Item>
								<Menu.Item

									onClick={() => navigate('/reading')}
									icon={<IconStar size="0.9rem" stroke={1.5} color={theme.colors.yellow[6]} />}
								>
									Currently Reading
								</Menu.Item>
								<Menu.Item
									disabled
									icon={<IconMessage size="0.9rem" stroke={1.5} color={theme.colors.blue[6]} />}
								>
									Your Reviews
								</Menu.Item>

								<Menu.Label>Settings</Menu.Label>
								<Menu.Item onClick={logout} icon={<IconLogout size="0.9rem" stroke={1.5} />}>Logout</Menu.Item>

								<Menu.Item disabled icon={<IconSettings size="0.9rem" stroke={1.5} />}>
									Account settings
								</Menu.Item>


								<Menu.Divider />
							</Menu.Dropdown>
						</Menu> : <Button onClick={() => navigate('/auth/login')}>Login</Button>}
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

			<Footer />
		</>

	);
}