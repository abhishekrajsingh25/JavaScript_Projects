const button = document.querySelector("button");

button.addEventListener("click", () => {
  if (navigator.geolocation) {
    button.innerText = "Allow to detect location";
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    button.innerText = "Your browser not support";
  }
});

function onSuccess(position) {
  button.innerText = "Detecting your location...";
  let { latitude, longitude } = position.coords;
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=89ecd726b039481a9e4107d5cb5ddf09`
  )
    .then((response) => response.json())
    .then((result) => {
      let allDetails = result.results[0].components;
      let { county, postcode, country } = allDetails;
      button.innerText = `${county} ${postcode}, ${country}`;
    })
    .catch(() => {
      button.innerText = "Failed to detect location";
    });
}

function onError(error) {
  if (error.code == 1) {
    button.innerText = "You denied the request";
  } else if (error.code == 2) {
    button.innerText = "Location not available";
  } else {
    button.innerText = "Something went wrong";
  }
  button.setAttribute("disabled", "true");
}
