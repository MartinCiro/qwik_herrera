import { $, component$, useContext, useOnDocument, useVisibleTask$ } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation, type DocumentHead } from '@builder.io/qwik-city';
import { head as generateHead } from '~/components/shared/head/head';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';
import { getPokemons } from '~/helpers/get-pokemons';
import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {

    const offset = Number(query.get("offset") || 0);
    if (offset < 0) redirect(301, `${pathname}?offset=0`);

    return await getPokemons(offset);
});

export default component$(() => {
    const pokemonState = useContext( PokemonListContext );
    const location = useLocation();

    useVisibleTask$( async ({track})=>{ //window.onload → Se ejecuta cuando toda la página ha cargado
        track(() => pokemonState.currentPage);
        pokemonState.isLoading = false;
        const pokemons = await getPokemons(pokemonState.currentPage * 10, 30);
        pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
        pokemonState.isLoading = true;
    }) 


    useOnDocument("scroll", $(() => {
        const scrollHeight = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;
        if ((currentScroll + 200) >= scrollHeight && pokemonState.isLoading) {
            pokemonState.isLoading = false;
            pokemonState.currentPage++;
        }

    }))
    return (
        <><div class="flex flex-col">
            <span class="my-5 text-5xl">Status</span>
            <span>Current offset: {pokemonState.currentPage}</span>
            <span>Is navigating {location.isNavigating ? "true" : "false"}</span>
        </div>
            <div class="mt-10">
                <button onClick$={()=> pokemonState.currentPage++} class="btn btn-primary mr-2">
                    Siguientes
                </button>
            </div>
            <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
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
