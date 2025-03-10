import { component$, useComputed$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation, type DocumentHead } from '@builder.io/qwik-city';
import { head as generateHead } from '~/components/shared/head/head';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';
import { getPokemons } from '~/helpers/get-pokemons';
import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {

    const offset = Number(query.get("offset") || 0);
    if (offset < 0) redirect(301, `${pathname}?offset=0`);

    return await getPokemons(offset);
});

interface PokemonPageState {
    currenPage: number;
    pokemons: SmallPokemon[];
}


export default component$(() => {
    const location = useLocation();

    const pokemonState = useStore<PokemonPageState>({
        currenPage: 0,
        pokemons: [],
    })

    useVisibleTask$( async ({track})=>{
        track(() => pokemonState.currenPage);
        const pokemons = await getPokemons(pokemonState.currenPage * 10);
        pokemonState.pokemons = pokemons;
    }) 
    return (
        <><div class="flex flex-col">
            <span class="my-5 text-5xl">Status</span>
            <span>Current offset: {pokemonState.currenPage}</span>
            <span>Is navigating {location.isNavigating ? "true" : "false"}</span>
        </div>
            <div class="mt-10">
                <button onClick$={()=> pokemonState.currenPage--} class="btn btn-primary mr-2">
                    Anteriores
                </button>
                <button onClick$={()=> pokemonState.currenPage++} class="btn btn-primary mr-2">
                    Siguientes
                </button>
            </div>
            <div class="grid grid-cols-6 mt-5">
                {
                    pokemonState.pokemons.map(pokemon => ( 
                        <div key={pokemon.name} class="m-5 flex flex-col justify-center items-center">
                            <PokemonImage id={pokemon.id} isFront={false} />
                            <span class="capitalize">{pokemon.name}</span>
                        </div>
                    ))
                }
                <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
            </div>
        </>
    );
});

export const head: DocumentHead = generateHead("Client", "Página con la lista de Pokemons");
