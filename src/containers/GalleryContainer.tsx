import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { CardComponent } from '../components/CardComponent';
import { SearchInputComponent } from '../components/SearchInputComponent';
import { useQuery } from 'react-query';
import { getPokemonsList } from '../services/pokemonService';
import CircularIndeterminate from '../common/CircularLoaderComponent';
import BasicPagination from '../common/PaginationComponent';
import axios from 'axios';

interface QueryResultPropType {
	data: any;
	isLoading: boolean;
	isError: boolean;
	error: any;
}

const GalleryContainer = () => {
	const [state, setState] = useState({
		searchValue: '',
		currentPage: 1,
		limitCount: 20,
		pokemonDataList: [],
	})

	const { limitCount, currentPage, searchValue, pokemonDataList } = state;

	const {isLoading, data: respData, isError, error} : QueryResultPropType = useQuery(
		[searchValue, limitCount, currentPage],
		() => getPokemonsList(limitCount, currentPage),
	)

	const { data } = respData || {};

	const getAllPokemonsURL = () => {
		const urlArr = data.results.map((item: {url: string}) => axios.get(item.url))
		return urlArr
	}

	useEffect(() => {
		data?.results.length && 
		axios.all(getAllPokemonsURL()).then(axios.spread((...responses) => {
			const pokemonList = responses.map((response: any) => {
				return {
					id: response.data.id,
					name: response.data.name,
					height: response.data.height,
					weight: response.data.weight,
					abilities: response.data.abilities.map((ability: any) => ability.ability.name),
					image: response.data.sprites.front_default,
				}
			});

			// @ts-ignore
			setState((prevState) => ({
				...prevState,
				pokemonDataList: pokemonList,
			}))
			
		})).catch(errors => {
			console.log("errors", errors);
		})
	}, [data?.results])

	const handleSearchInput = (value: string) => {
		setState((prevProp) => ({
			...prevProp,
			searchValue: value,
		}))
	}

	const renderPaginationComponent = () => {
		return (
			<BasicPagination
				currentPage={currentPage}
				limitCount={20}
				totalCount={data?.count}
				handlePagination={(page) => {
					setState((prevProp) => ({
						...prevProp,
						currentPage: page,
					}))
				}}
			/>
		)
	}

  return (
    <div>
			<SearchInputComponent
				handleSearchInput={handleSearchInput}
				searchValue={searchValue}
			/>
			{
				isLoading && <CircularIndeterminate />
			}
			{
				isError && <p>{error.message}</p>
			}
			{ pokemonDataList.length && !isLoading && (
				<>
					{ renderPaginationComponent() }
					<Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
							{pokemonDataList.map((pokemon: any) => (
								<Grid item xs={2} sm={4} md={2} key={pokemon.id}>
									<CardComponent
										id={pokemon.id}
										name={pokemon.name}
										height={pokemon.height}
										weight={pokemon.weight}
										listOfAbilities={pokemon.abilities}
										image={pokemon.image}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
					{ renderPaginationComponent() }
				</>
			)}
    </div>
  );
}

export default GalleryContainer;
