import type {  PokemonListResponse, SmallPokemon } from "~/interfaces";

export const getPokemons = async (offset: number = 0, limit: number = 10): Promise<SmallPokemon[]> => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await resp.json() as PokemonListResponse;
    return data.results.map(({ name, url }) => {
        const id = url.split("/").at(-2) as string;
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
        
        return { id, name, img };
    });
}