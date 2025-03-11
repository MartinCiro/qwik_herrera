import { component$, Slot, useContextProvider, useStore } from "@builder.io/qwik";
import { PokemonGameContext, type PokemonGameState } from "~/context";

export default component$(() => {

  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    isPokemonVisible: false,
    shownBackImage: false
  })

  useContextProvider(PokemonGameContext, pokemonGame)
  return <Slot />;
});
