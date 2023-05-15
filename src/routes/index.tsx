import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';

const VALUES = {
  DEFAULT_SIZE: 150,
  DEFAULT_POSITION: true,
  DEFAULT_SHOW_POKEMON: true,
  NEGATIVE_NUMBER_ONE: -1,
  POSITIVE_NUMBER_ONE: +1,
  MIN_ID: 0,
  DOUBLE: 2,
  TRIPLE: 3,
};

export default component$(() => {
  const pokemonId = useSignal<number>(VALUES.POSITIVE_NUMBER_ONE);
  const size = useSignal<number>(VALUES.DEFAULT_SIZE);
  const showFront = useSignal<boolean>(VALUES.DEFAULT_POSITION);
  const showPokemon = useSignal(VALUES.DEFAULT_SHOW_POKEMON);

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value > VALUES.MIN_ID) {
      pokemonId.value += value;
    }
  });

  const reSize = $(
    (value: number): number => (size.value = VALUES.DEFAULT_SIZE * value)
  );

  return (
    <>
      <span class='text-2xl'>Buscador simple</span>
      <span class='text-9xl'>{pokemonId}</span>

      <PokemonImage
        id={pokemonId.value}
        size={size.value}
        isFront={showFront.value}
        isPokemonVisible={showPokemon.value}
      />

      <div class='mt-2'>
        <button
          onClick$={() => changePokemonId(VALUES.NEGATIVE_NUMBER_ONE)}
          class='btn btn-primary mr-2'
        >
          Anterior
        </button>
        <button
          onClick$={() => changePokemonId(VALUES.POSITIVE_NUMBER_ONE)}
          class='btn btn-primary'
        >
          Siguiente
        </button>
      </div>
      <div class='mt-2'>
        <button
          onClick$={() => (size.value = VALUES.DEFAULT_SIZE)}
          class='btn btn-primary mr-2'
        >
          X1
        </button>
        <button
          onClick$={() => reSize(VALUES.DOUBLE)}
          class='btn btn-primary mr-2'
        >
          x2
        </button>
        <button onClick$={() => reSize(VALUES.TRIPLE)} class='btn btn-primary'>
          x3
        </button>
      </div>
      <div class='mt-2'>
        <button
          onClick$={() => (showFront.value = !showFront.value)}
          class='btn btn-primary mr-2'
        >
          Ver {!showFront.value ? 'frente' : 'espalda'}
        </button>
        <button
          onClick$={() => (showPokemon.value = !showPokemon.value)}
          class='btn btn-primary mr-2'
        >
          {!showPokemon.value ? 'Mostrar' : 'Ocultar'}
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Poke-Qwik',
  meta: [
    {
      name: 'description',
      content: 'Esta es mi primera aplicación en Qwik',
    },
  ],
};
