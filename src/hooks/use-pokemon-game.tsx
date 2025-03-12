import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
    const pokemonGame = useContext( PokemonGameContext );

    const change = $((value: number) => {
        if (pokemonGame.pokemonId+ value <= 0) return;
        pokemonGame.pokemonId += value
      })

    const toggleFromBack = $(()=> { pokemonGame.shownBackImage = !pokemonGame.shownBackImage })

    return {
        pokemonId       : useComputed$( () => pokemonGame.pokemonId ),
        showBackImage   : useComputed$( () => pokemonGame.shownBackImage ),
        isPokemonVisible: useComputed$( () => pokemonGame.isPokemonVisible ),

        toggleFromBack  : toggleFromBack,
        nextPokemon: $(() => change(+1)),
        prevPokemon: $(() => change(-1)),
    }
}