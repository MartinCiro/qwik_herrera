import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonLoader = routeLoader$<{ id: number }>(({ params, redirect }) => {
    const id = Number(params.id)
    if (isNaN(id)) redirect(301, "/")
    if (id <= 0) redirect(301, "/")
    if (id > 1000) redirect(301, "/")
    return { id: Number(params.id) };
});


export default component$(() => {
    const { pokemonId, showBackImage, toggleFromBack } = usePokemonGame();

    return (
        <div>
            <h1>Pokemons ID</h1>
            <p>{pokemonId}</p>
            <PokemonImage id={pokemonId.value} size={600} isFront={showBackImage.value} />
            <div class="mt-2">
                <button onClick$={toggleFromBack} class="btn btn-primary">Voltear</button>
            </div>
        </div>
    );
});