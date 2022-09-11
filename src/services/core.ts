import { CrossTabClient, badge, badgeEn, log } from '@logux/client';
import { badgeStyles } from '@logux/client/badge/styles';
import { loguxSubscribe, loguxUnsubscribe } from '@logux/actions';

import { registerDestructor } from '@glimmer/destroyable';

export default class Core {
  client: CrossTabClient;

  constructor({ userId, token }: { userId: string; token?: string }) {
    const client = new CrossTabClient({
      subprotocol: '1.0.0',
      server: 'ws://127.0.0.1:31337',
      userId,
      token,
    });

    badge(client, { messages: badgeEn, styles: badgeStyles });
    log(client);

    client.start();

    this.client = client;
  }

  subscribeChannel(channel: string, component?: object) {
    this.client.sync(loguxSubscribe({ channel })).then(() => {
      console.log('subscribed');
    });

    if (component) {
      registerDestructor(component, () => {
        this.client.sync(loguxUnsubscribe({ channel })).then(() => {
          console.log('unsubscribed');
        });
      });
    }
  }
}
