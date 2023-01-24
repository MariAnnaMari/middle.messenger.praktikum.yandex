import Block from 'core/Block';

import './layout.css';

interface LayoutProps {
  title?: string;
  fullScreen?: boolean;
}

export class Layout extends Block<LayoutProps> {
  static componentName = 'Layout';
  protected render(): string {
    // language=hbs
    return `
        {{#if fullScreen}}
            <main class="main main-full">
                <div  class="full-container" data-layout=1></div>
            </main>
        {{else}}
            <main class="main">
                <div class="form-container">
                  <h3 class="text-center" ><i class="fa fa-long-arrow-left" aria-hidden="true" onclick="history.back()"></i><span class="title">{{title}}</span></h3>
                  <div data-layout=1></div>
                </div>
            </main>
        {{/if}}
    `;
  }
}
