import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {

  const pokemonId = useSignal(1); // primitive, not reactive, boolean

  const increment = $(
    () => {
       pokemonId.value++;
     }
  );
  return (
    <>
      <h1>Hi 👋</h1>
      <button onClick$={increment} class="btn btn-primary">Increment</button>
      <p>{pokemonId.value}</p>

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
