import { createContextId } from "@builder.io/qwik";

export interface PokemonGameState {
    pokemonId: number;
    isPokemonVisible: boolean;
    shownBackImage: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>("pokemon.game-context");