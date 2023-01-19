const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

interface HttpTransportOptions<P = any> {
  method?: string;
  data?: any;
  headers?: string;
  timeout?: number;
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
    url: string,
    options: HttpTransportOptions,
    timeout?: number
  ): Promise<any> {
    const { method, data } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET) {
        xhr.open(method, url + '?' + queryStringify(data));
      } else {
        if (typeof method === 'string') {
          xhr.open(method, url);
        }
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = function (err) {
        console.log(err);
        reject();
      };

      if (timeout != null) {
        xhr.timeout = timeout;
      }

      xhr.ontimeout = reject;
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(queryStringify(data));
      }
    });
  }
}
