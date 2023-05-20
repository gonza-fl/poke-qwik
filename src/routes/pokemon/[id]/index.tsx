import { component$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  // useLocation,
  routeLoader$,
} from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';

export const usePokemonId = routeLoader$<number>(
  async ({ params, redirect }) => {
    const id = Number(params.id);
    if (isNaN(id) || id <= 0 || id > 1010) {
      redirect(301, '/');
    }
    return id;
  }
);

export default component$(() => {
  const pokemonId = usePokemonId();
  // const loc = useLocation();
  return (
    <>
      {/* <span class='text-9xl'>Pokemon {loc.params.id}</span> */}
      <span class='text-9xl'>Pokemon {pokemonId}</span>
      <PokemonImage id={pokemonId.value} isPokemonVisible />
    </>
  );
});

export const head: DocumentHead = {
  title: 'pokemon',
};
