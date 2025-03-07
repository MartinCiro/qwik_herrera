import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { head as generateHead } from '~/components/shared/head/head';


export default component$(() => {
    return (
        <div>
            <h1>Pokemons</h1>
        </div>
    );
});

export const head: DocumentHead = generateHead("Ssr", "Pagina ssr con la lista de Pokemons");