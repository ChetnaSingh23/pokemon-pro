import axios from "axios"

export const getPokemonsList = (limit: number = 20, offset: number = 0) => {
	return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
}

export const getPokemonDetails = (id: string) => {
	return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
}
