import { $, component$, useContext } from "@builder.io/qwik";
import { Link, useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/shared/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {
  const nav = useNavigate();
  const { pokemonId, showBackImage, isPokemonVisible, toggleFromBack, nextPokemon, prevPokemon } = usePokemonGame();

  const goToPokemon = $((id: number) => {
    nav(`/pokemons/${id}/`)
  })

  return (
    <>
      <h1>Hi 👋</h1>
      <span class="text-3xl"> {pokemonId} </span>
      <div onClick$={() => goToPokemon(pokemonId.value)}>
        <PokemonImage id={pokemonId.value} size={600} isFront={showBackImage.value} />
        </div>
      <div class="mt-2">
        <button onClick$={nextPokemon} class="btn btn-primary mr-2">Increment</button>
        <button onClick$={prevPokemon} class="btn btn-primary mr-2">Decrement</button>
        <button onClick$={ toggleFromBack } class="btn btn-primary">Voltear</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Meta description",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
