const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const BASE_API = 'https://ya-praktikum.tech/api/v2';

interface HttpTransportOptions {
  method?: string;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  mode?: string;
  credentials?: string;
}

function queryStringify(data: any): string {
  const queryString: string = Object.keys(data)
    .map((key) => key + '=' + data[key])
    .join('&');
  return queryString;
}

export default class HttpTransport<Props> {
  public get(url: string, options: HttpTransportOptions = {}): Promise<any> {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  }

  public post(url: string, options: HttpTransportOptions = {}): Promise<any> {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  }

  public put(url: string, options: HttpTransportOptions = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  }

  public delete(url: string, options: HttpTransportOptions = {}): Promise<any> {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  }

  public request(
    path: string,
    options: HttpTransportOptions,
    timeout?: number
  ): Promise<any> {
    const { method, data, headers } = options;
    const url = `${BASE_API}/${path}`;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status >= 400) {
          reject(xhr.responseText);
        }
      };

      if (method === METHODS.GET) {
        xhr.open(method, url);
      } else {
        if (typeof method === 'string') {
          xhr.open(method, url);
        }
      }
      if (!headers) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      } else if (!headers?.contentType) {
        xhr.setRequestHeader('Content-Type', headers?.contentType);
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = function (err) {
        reject(err);
      };

      if (timeout != null) {
        xhr.timeout = timeout;
      }

      xhr.ontimeout = reject;
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        if (!headers) {
          xhr.send(JSON.stringify(data));
        } else {
          xhr.send(data);
        }
      }
    });
  }
}
export const apiRequest = new HttpTransport();
