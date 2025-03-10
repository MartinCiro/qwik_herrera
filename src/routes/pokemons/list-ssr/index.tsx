import { component$, useComputed$ } from '@builder.io/qwik';
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


export default component$(() => {
    const pokemons = usePokemonList()
    const location = useLocation();
    const currentOffset = useComputed$<number>(() => {
        const searchParams = new URLSearchParams(location.url.search);
        return Number(searchParams.get("offset") || 0);
    })
    return (
        <><div class="flex flex-col">
            <span class="my-5 text-5xl">Status</span>
            <span>Current offset: {currentOffset}</span>
            <span>Is navigating {location.isNavigating ? "true" : "false"}</span>
        </div>
            <div class="mt-10">
                <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`} class="btn btn-primary mr-2">
                    Anteriores
                </Link>
                <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`} class="btn btn-primary mr-2">
                    Siguientes
                </Link>
            </div>
            <div class="grid grid-cols-6 mt-5">
                {
                    pokemons.value.map(pokemon => ( 
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

export const head: DocumentHead = generateHead("Ssr", "Pagina ssr con la lista de Pokemons");