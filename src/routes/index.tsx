import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/shared/pokemons/pokemon-image";

export default component$(() => {

  const pokemonId = useSignal(1); 
  const showImage = useSignal(false);

  const change = $((value: number) => {
    if (pokemonId.value + value <= 0) return;
    pokemonId.value += value
  })
  return (
    <>
      <h1>Hi 👋</h1>
      <span class="text-3xl"> {pokemonId} </span>
      <PokemonImage id={pokemonId.value} size={600} isFront={showImage.value}/>
      <div class="mt-2">
        <button onClick$={() => change(1)} class="btn btn-primary">Increment</button>
        <button onClick$={() => change(-1)} class="btn btn-primary">Decrement</button>
        <button onClick$={() => showImage.value = !showImage.value} class="btn btn-primary">Voltear</button>
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
