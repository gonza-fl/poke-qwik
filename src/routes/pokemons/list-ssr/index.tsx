import { component$ } from '@builder.io/qwik';
import { type DocumentHead, Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <div class='flex flex-col'>
        <span class='my-5'>Status</span>
        <span>Página actual: xxx</span>
        <span>Está cargando página: xxx</span>
      </div>
      <div class='mt-10'>
        <Link class='btn btn-primary mr-2'>Anterior</Link>
        <Link class='btn btn-primary mr-2'>Siguiente</Link>
      </div>
      <div class='grid grid-cols-6 mt-5'>
        <div class='m-5 flex flex-col justify-center items-center'>Pokemon</div>
        <div class='m-5 flex flex-col justify-center items-center'>Pokemon</div>
        <div class='m-5 flex flex-col justify-center items-center'>Pokemon</div>
        <div class='m-5 flex flex-col justify-center items-center'>Pokemon</div>
        <div class='m-5 flex flex-col justify-center items-center'>Pokemon</div>
        <div class='m-5 flex flex-col justify-center items-center'>Pokemon</div>
        <div class='m-5 flex flex-col justify-center items-center'>Pokemon</div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'List SSr',
};
