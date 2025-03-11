import { component$, Slot } from "@builder.io/qwik";
import { PokemonProvider } from "~/context";

export default component$(() => {


  return (
    <PokemonProvider>
      <Slot />
    </PokemonProvider>

  );
});
