import Block from '../../core/Block';

import './link.css';

interface LinkProps {
  text: string;
  to: string;
  icon?: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      location.href = this.props.to;
    };

    super({ ...props, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `
      <a href="{{to}}">
        {{#if icon}}<i class='fa fa-{{icon}}' aria-hidden='true'></i>{{/if}}        
      </a>
    `;
    // return `<a href="{{to}}">{{text}}</a>`;
  }
}
