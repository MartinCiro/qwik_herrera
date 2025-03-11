import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export const usePokemonLoader = routeLoader$<{ id: number }>(({ params, redirect }) => {
    const id = Number(params.id)
    if (isNaN(id)) redirect(301, "/")
    if (id <= 0) redirect(301, "/")
    if (id > 1000) redirect(301, "/")
    return { id: Number(params.id) };
});


export default component$(() => {
    
    const pokemonId = usePokemonLoader()
    const pokemonGame = useContext(PokemonGameContext)
    return (
        <div>
            <h1>Pokemons ID</h1>
            <p>{ pokemonId.value.id }</p>
            <PokemonImage id={pokemonGame.pokemonId} />
        </div>
    );
});