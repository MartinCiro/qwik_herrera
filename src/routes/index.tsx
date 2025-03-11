import { $, component$, useContext } from "@builder.io/qwik";
import { Link, useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/shared/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  const nav = useNavigate();

  const pokemonGame = useContext( PokemonGameContext );


  const change = $((value: number) => {
    if (pokemonGame.pokemonId+ value <= 0) return;
    pokemonGame.pokemonId += value
  })
  const goToPokemon = $((id: number) => {
    nav(`/pokemons/${id}/`)
  })
  return (
    <>
      <h1>Hi 👋</h1>
      <span class="text-3xl"> {pokemonGame.pokemonId} </span>
      <div onClick$={() => goToPokemon(pokemonGame.pokemonId)}>
        <PokemonImage id={pokemonGame.pokemonId} size={600} isFront={pokemonGame.isPokemonVisible} />
        </div>
      <div class="mt-2">
        <button onClick$={() => change(1)} class="btn btn-primary mr-2">Increment</button>
        <button onClick$={() => change(-1)} class="btn btn-primary mr-2">Decrement</button>
        <button onClick$={() => pokemonGame.isPokemonVisible= !pokemonGame.isPokemonVisible} class="btn btn-primary">Voltear</button>
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
