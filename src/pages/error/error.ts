import Block from 'core/Block';

type ErrorProps = {
  status?: number;
  text?: string;
};

export class ErrorPage extends Block<ErrorProps> {
  static componentName = 'ErrorPage';

  render(): string {
    // language=hbs
    return `
        <div class='info-container'>
            {{status}}
            <br />
            {{text}}
        </div>
    `;
  }
}
