import { getPhotos } from "./js/requests";
import "./styles/styles.scss";
import template from "./templates/main.hbs";
import LocalStorageWrapper from "./js/utils";

window.onload = () => {
  const container = document.getElementById("container");
  const timer = document.getElementById("timer");

  setInterval(() => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    timer.innerHTML = `${hours}: ${minutes}: ${seconds}`;
  }, 1000);
  container.innerHTML = template({ isLoading: true });

  const photos = getPhotos();

  photos
    .then((res) => {
      container.innerHTML = template({ pageContent: res, isLoading: false });
    })
    .catch((err) => console.log(err));

  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));

  const localStorageWrapper = new LocalStorageWrapper();
  const saveUserData = document.getElementById("saveUserData");

  saveUserData.addEventListener("click", () => {
    localStorageWrapper.setUserData();
    modal.hide();
  });

  if (!localStorageWrapper.checkUserData()) {
    setTimeout(() => {
      modal.show();
    }, 5000);
  }
};
