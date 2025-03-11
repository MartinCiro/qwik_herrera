import { component$, Slot, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
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

    useVisibleTask$(() => {
        if (localStorage.getItem('pokemon-game')) {
            const {
                pokemonId=10,
                isPokemonVisible=false,
                shownBackImage=false
            } = JSON.parse(localStorage.getItem('pokemon-game') || '') as PokemonGameState
            pokemonGame.pokemonId = pokemonId
            pokemonGame.isPokemonVisible = isPokemonVisible
            pokemonGame.shownBackImage = shownBackImage
        }
    })

    useVisibleTask$(({ track }) => {
        track(() => [ pokemonGame.pokemonId, pokemonGame.isPokemonVisible, pokemonGame.shownBackImage ])
        
        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
    })

    return <Slot />;
});