import Block from './Block';

export default function renderDOM(block: Block<Record<string, any>>) {
  const root = document.querySelector('#app');

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
