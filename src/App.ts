import Component, { hbs, tracked } from '@glimmerx/component';
import { Router, RouteParams, openPage } from '@lifeart/tiny-router';
// @ts-ignore
import { on } from '@glimmerx/modifier';
// @ts-ignore
import Counter from './Counter';

// Types for :params in route templates
// interface Routes {
//   home: void;
//   post: 'postId';
// }

export const router = new Router({
  home: '/',
  posts: '/posts',
  'posts.post': '/posts/:postId',
});

// async data loading per-route
router.addResolver('posts.post', async function (page: RouteParams) {
  debugger;

  return { postId: page.postId, component: Counter };
});

router.mount(document?.location.pathname ?? '/');

export default class App extends Component {
  @tracked hidden = false;
  @tracked route = '';
  @tracked routeComponent: Component | undefined;
  @tracked routeData: unknown | undefined;

  static template = hbs`
    <h1>Test</h1>

    <button type='button' {{on 'click' this.toggleHide}}>Toggle Counter</button>
    <button type='button' {{on 'click' this.nav}}>Nav</button>

    {{#if this.hidden}}
      <Counter/>
    {{/if}}

    Route: {{this.route}}
    <this.routeComponent @data={{this.routeData}}/>
  `;

  constructor(owner: object, args: Record<string, unknown>) {
    super(owner, args);

    router.addHandler((page, data: any, stack) => {
      debugger;
      console.log(page.path, { page, data });
      this.route = page.path;
      const { component, ...routeData } = data ?? {};
      this.routeComponent = component;
      this.routeData = routeData;
    });
  }

  toggleHide = () => {
    this.hidden = !this.hidden;
    console.log('toggled', { hidded: this.hidden });
  };

  nav = () => openPage(router, 'posts.post', { postId: '1' });
}
