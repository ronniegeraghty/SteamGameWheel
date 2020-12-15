export const fetchVersion = (): Promise<string> | undefined => {
  return fetch(`/api/version`)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Caught Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then((json) => {
      return json.version;
    });
};
