import { BASE_URL } from "./constants";

export const getPhotos = () => {
  return fetch(`${BASE_URL}/photos`)
    .then((response) => {
      console.log({ response });
      if (response.status === 200) {
        return response.json();
      }
    })
    .catch((err) => console.log(err));
};
