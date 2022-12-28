import Block from 'core/Block';

import './layout.css';

interface LayoutProps {
  title?: string;
  fullScreen?: boolean;
}

export class Layout extends Block<LayoutProps> {
  protected render(): string {
    // language=hbs
    return `
      <main class="main">  
        {{#if fullScreen}}
          <div  class="full-container" data-layout=1>
          </div>
        {{else}}
            <div class="form-container">
              <h3 class="text-center" ><i class="fa fa-long-arrow-left" aria-hidden="true" onclick="history.back()"></i><span class="title">{{title}}</span></h3>
              <div data-layout=1></div>
            </div>
        {{/if}}
      </main>
    `;
  }
}
