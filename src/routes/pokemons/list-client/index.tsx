import {
  $,
  component$,
  useOnDocument,
  useStore,
  useTask$,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

interface PokemonPageState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });

  //* Solo se ejecuta desde el cliente
  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);

  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  // });

  /**
   ** Se ejecuta desde el server cuando se monta el componente por primera vez
   ** y se continua luego desde el frontend cada que se actualiza un store value
   */

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  });

  /**
   ** Se usa para programaticamente agregar listeners
   ** En este caso agrego una funcion al evento scroll
   */
  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true;

        pokemonState.currentPage++;
      }
    })
  );

  return (
    <>
      <div class='grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 mt-5'>
        {pokemonState.pokemons.map(({ name, id }, i) => (
          <div key={i} class='m-5 flex flex-col justify-center items-center'>
            <PokemonImage id={id} isPokemonVisible />
            <span class='capitalize'>{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Client-list',
};
