import { component$, Slot, useContextProvider, useStore } from "@builder.io/qwik";
import { PokemonGameContext, type PokemonGameState } from "./pokemon-game.context";
import { PokemonListContext, type PokemonListState } from "./pokemon-list.context";

export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 1,
        isPokemonVisible: false,
        shownBackImage: false
    })

    
    const pokemonList = useStore<PokemonListState>({
        currentPage: 1,
        isLoading: false,
        pokemons: []
    })
    
    useContextProvider(PokemonGameContext, pokemonGame)
    useContextProvider(PokemonListContext, pokemonList)

    return <Slot />;
});