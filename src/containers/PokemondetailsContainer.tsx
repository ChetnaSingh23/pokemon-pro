import * as React from 'react';
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from 'react-query';
import { getPokemonDetails } from '../services/pokemonService';
import { Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Types from '../components/TypesComponent';

interface QueryResultPropType {
	data: any;
	isLoading: boolean;
	isError: boolean;
	error: any;
}

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; palette: { primary: { main: any; }; }; }) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: 'center'
  },
  sprite: {
    width: '300px'
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrow: {
    fontSize: '3rem',
    color: "lightBlue"
  },
  name: {
    marginBottom: '1rem',
  },
  pokeball: {
    width: '30px',
    height: '30px',
    marginRight: '1rem',
  },
  description: {
    marginTop: '1rem',
    display: 'block'
  }
}));

const PokemonDetailsContainer = () => {
	const classes = useStyles();
	const { id } = useParams();

  const {isLoading, data: respData, isError, error} : QueryResultPropType = useQuery(
		'pokemon-details',
		// @ts-ignore
		() => getPokemonDetails(id),
	)

	const { data } = respData || {};

	const getTypes = () => {
		const { types } = data;
		return types.map((type: any) => type.type.name);
	}

  return (
		<>
			{isLoading && <CircularProgress />}
			{isError && <p>{error.message}</p>}
			{data && !isLoading && (
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<Grid container spacing={3}>
									<Grid item xs={4}>
										<img alt={data.sprites.front_default} src={data.sprites.front_default} className={classes.sprite} />
									</Grid>
								</Grid>
								<Typography variant="h2" className={classes.name}>{data.name}</Typography>
								<Types types={getTypes()} />
							</Paper>
						</Grid>
					</Grid>
				</div>
			)}
		</>
  );
}

export default PokemonDetailsContainer;
