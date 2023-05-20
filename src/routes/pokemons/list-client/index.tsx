import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <>Hola mundo client</>;
});

export const head: DocumentHead = {
  title: 'Client-list',
  meta: [
    {
      name: 'description',
      content: 'Lista de pokemons desde el cliente',
    },
  ],
};
