import Block from 'core/Block';

import './layout.css';

interface LayoutProps {}

export class FormLayout extends Block<LayoutProps> {
  protected render(): string {
    // language=hbs
    return `
      <main class="main">
        <div class="auth container">
          <h3 class="text-center">{{title}}</h3>
          <div data-layout=1></div>
        </div>
      </main>
    `;
  }
}
