import { Block, PathRouter, Store } from 'core';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';

import './link.css';

interface LinkProps {
  text: string;
  to: string;
  icon?: string;
  events?: { click?: () => void };
  withRout?: boolean;
  router: PathRouter;
  store: Store<AppState>;
}

export class Link extends Block<LinkProps> {
  static componentName = 'Link';
  constructor(props: LinkProps) {
    const onClick = () => {
      this.props.router.go('/setting');
    };

    super({ ...props, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `
        <span>
            {{#if icon}}<i class='fa fa-{{icon}}' aria-hidden='true'></i>{{/if}}
        </span>
    `;
  }
}
export default withRouter(withStore(Link));
