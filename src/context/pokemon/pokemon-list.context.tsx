import { createContextId } from "@builder.io/qwik";
import { SmallPokemon } from "~/interfaces";

export interface PokemonListState {
    pokemons: SmallPokemon[];
    isLoading: boolean;
    currentPage: number;
}

export const PokemonListContext = createContextId<PokemonListState>('pokemon-list-context');