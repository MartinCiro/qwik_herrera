import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { head as generateHead } from '~/components/shared/head/head'; // Renombramos para evitar conflicto

export default component$(() => {
    return (
        <div>
            <h1>Pokemons client</h1>
        </div>
    );
});

export const head: DocumentHead = generateHead("Client", "Página con la lista de Pokemons");
