import { component$, useComputed$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset')) || 0;
    if (offset < 0 || isNaN(offset)) redirect(301, pathname);
    return getSmallPokemons(offset);
  }
);

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();
  const currentOffset = useComputed$<number>(() => {
    const offsetString = location.url.searchParams.get('offset');
    return (!isNaN(Number(offsetString)) && Number(offsetString)) || 0;
  });

  return (
    <>
      <div class='flex flex-col'>
        <span class='my-5'>Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Está cargando página: {location.isNavigating ? 'SI' : 'NO'}</span>
      </div>
      <div class='mt-10'>
        <Link
          class='btn btn-primary mr-2'
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
        >
          Anterior
        </Link>
        <Link
          class='btn btn-primary mr-2'
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
        >
          Siguiente
        </Link>
      </div>

      <div class='grid grid-cols-6 mt-5'>
        {pokemons.value.map(({ name, id }) => (
          <div key={name} class='m-5 flex flex-col justify-center items-center'>
            <PokemonImage id={id} isPokemonVisible />
            <span class='capitalize'>{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'List SSr',
};
