import Component, { tracked, hbs } from '@glimmerx/component';
import { helper } from '@glimmerx/helper';
import { on, action } from '@glimmerx/modifier';

const greet = helper(function (
  [name]: [string],
  { greeting }: { greeting: string }
) {
  return `Helper: ${greeting || 'Hey there'} ${name}!`;
});

const TemplateOnlyComponent = hbs`<h2>I am rendered by a template only component: {{@name}}</h2>`;

class MyComponent extends Component {
  static template = hbs`
    <h1>Hello {{this.message}}</h1>

    <br />

    {{greet "foo"}}

    <br />

    <button {{on "click" this.increment}}>Increment</button>

    <TemplateOnlyComponent @name="For Glimmerx" />

    {{this.count}}
  `;

  message = 'hello world';
  @tracked count = 55;

  @action
  increment() {
    this.count++;
  }
}

export default MyComponent;
