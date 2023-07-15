import { Box, NativeSelect, Text } from '@mantine/core';
import { useState } from 'react';
import { Group } from '@mantine/core';
import { YearPicker } from '@mantine/dates';

export default function Filters() {
	const [value, setValue] = useState<Date | null>(null);

	return (
		<Box p={20}>
			<NativeSelect
				mt={10}
				data={['React', 'Vue', 'Angular', 'Svelte']}
				label="Filter by genre"
				// description="Filter by genre"
				withAsterisk
			/>
			<Group mt={20} >
				<Text fz='xs'>Filter By Publication Year</Text>
				<YearPicker allowDeselect mt={-10} size='xs' value={value} onChange={setValue} />
			</Group>
		</Box>

	);
}