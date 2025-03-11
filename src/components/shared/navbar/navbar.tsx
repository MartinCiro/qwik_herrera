import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="navbar bg-base-100 bg-blue">
      <ul>
        <li>
          <Link href="/pokemons/list-client/">Client-List</Link>
        </li>
        <li>
          <Link href="/pokemons/list-ssr/">SSR-List</Link>
        </li>
        <li>
          <Link href="/counter/">Counter</Link>
        </li>
      </ul>
    </div>
  );
});
