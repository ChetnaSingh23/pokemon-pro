import React from 'react';
import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

interface SearchInputProps {
	handleSearchInput: (value: string) => void;
	searchValue: string;
}

export const SearchInputComponent = ({handleSearchInput, searchValue}: SearchInputProps) => {
	return (
		<div style={{margin: '10px'}}>
			<TextField
				value={searchValue}
				placeholder='Search Pokemon'
				size='small'
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<IconButton>
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					)
				}}
				onChange={(e) => handleSearchInput(e.target.value)}
			/>
		</div>
	)
}
