import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/shared/pokemons/pokemon-image";

export default component$(() => {

  const pokemonId = useSignal(1); 

  const change = $((value: number) => {
    if (pokemonId.value + value <= 0) return;
    pokemonId.value += value
  })
  return (
    <>
      <h1>Hi 👋</h1>
      <span class="text-3xl"> {pokemonId} </span>
      <PokemonImage id={pokemonId.value} size={600}/>
      <div class="mt-2">
        <button onClick$={() => change(1)} class="btn btn-primary">Increment</button>
        <p>{pokemonId.value}</p>
        <button onClick$={() => change(-1)} class="btn btn-primary">Decrement</button>
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
