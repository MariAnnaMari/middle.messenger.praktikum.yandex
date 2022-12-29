import Block from '../../core/Block';

import './link.css';

interface LinkProps {
  text: string;
  to: string;
  icon?: string;
  events?: { click?: () => void };
}

export class Link extends Block<LinkProps> {
  static componentName = 'Link';
  constructor(props: LinkProps) {
    const onClick = () => {
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
  }
}
