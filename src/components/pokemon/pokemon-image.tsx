import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface Props {
  id: number;
  size?: number;
  isFront?: boolean;
  isPokemonVisible: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 200, isFront = true, isPokemonVisible }: Props) => {
    const imageLoaded = useSignal(false);
    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    return (
      <div
        class='flex items-center justify-center'
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Cargando...</span>}
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            !isFront ? 'back/' : ''
          }${id}.png`}
          alt='pokemon sprite'
          width={size}
          height={size}
          onLoad$={() => (imageLoaded.value = true)}
          class={[
            {
              hidden: !imageLoaded.value,
              'brightness-0': !isPokemonVisible,
            },
            'transition-all',
          ]}
        />
      </div>
    );
  }
);
