import { component$ } from '@builder.io/qwik';
import Navbar from '~/components/shared/navbar/navbar';

export default component$(() => {
  return (
    <>
      <Navbar />
      <p>Hola mundo</p>
    </>
  );
});
