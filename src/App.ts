import Component, { hbs, tracked } from '@glimmerx/component';
import { on, action } from '@glimmerx/modifier';
import { Router, Page, RouteParams } from '@lifeart/tiny-router';
import Counter from './Counter';

// Types for :params in route templates
interface Routes {
  home: void;
  post: 'postId';
}

export const router = new Router({
  home: '/',
  post: '/posts/:postId',
});

// async data loading per-route
router.addResolver('post', async function (page: RouteParams) {
  debugger;

  return { ok: true };
});

await router.mount('/posts/42');

export default class App extends Component {
  @tracked hidden = false;

  static template = hbs`
    <h1>Test</h1>

    <button type='button' {{on 'click' this.toggleHide}}>Toggle Counter</button>

    {{#if this.hidden}}
      <Counter/>
    {{/if}}
  `;

  toggleHide = () => (this.hidden = !this.hidden);
}
