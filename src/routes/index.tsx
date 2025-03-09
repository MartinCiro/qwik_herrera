import { $, component$, useSignal } from "@builder.io/qwik";
import { Link, useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/shared/pokemons/pokemon-image";

export default component$(() => {
  const nav = useNavigate();

  const pokemonId = useSignal(1);
  const showImage = useSignal(false);

  const change = $((value: number) => {
    if (pokemonId.value + value <= 0) return;
    pokemonId.value += value
  })
  const goToPokemon = $((id: number) => {
    nav(`/pokemons/${id}/`)
  })
  return (
    <>
      <h1>Hi 👋</h1>
      <span class="text-3xl"> {pokemonId} </span>
      <div onClick$={() => goToPokemon(pokemonId.value)}>
        <PokemonImage id={pokemonId.value} size={600} isFront={showImage.value} />
        </div>
      <div class="mt-2">
        <button onClick$={() => change(1)} class="btn btn-primary mr-2">Increment</button>
        <button onClick$={() => change(-1)} class="btn btn-primary mr-2">Decrement</button>
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
