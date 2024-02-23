import * as Sentry from '@sentry/node';

export namespace Requestly {
  async function sendRequest(url: string, options: RequestInit): Promise<Record<string, string>> {
    const response = await fetch(url, options);
    const chunks = [] as Uint8Array[];

    if (!response.body) {
      Sentry.withScope((scope) => {
        scope.setTags({ module: 'Requestly' });
        scope.setExtras({ method: options.method, url });
        Sentry.captureException('The body is empty');
      });

      return Promise.reject('no body');
    }

    for await (const chunk of response.body) {
      chunks.push(chunk);
    }

    const data = Buffer.concat(chunks).toString();

    if (response.ok) {
      return JSON.parse(data) as Record<string, string>;
    }

    return Promise.reject(data);
  }

  export function get(url: string) {
    return sendRequest(url, {
      method: 'GET',
    });
  }
}
