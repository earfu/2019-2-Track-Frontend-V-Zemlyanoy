import chatDefaults from '../chatDefaults';

function geolocate(chatId, appendMessage, save) {
  if (navigator.geolocation) {
    geolocate.chatId = chatId;
    geolocate.appendMessage = appendMessage;
    geolocate.save = save;
    // geolocate.message = 'Geolocation failed in an unexpected way.';
    navigator.geolocation.getCurrentPosition(locationLink, locationError);
  } else {
    appendMessage(
      chatId,
      'Geolocation API unavailable.',
      chatDefaults.geolocationServiceName,
    );
  }
}

export function locationLink(position) {
  const { latitude, longitude } = position.coords;
  const text = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  geolocate.appendMessage(
    geolocate.chatId,
    text,
    chatDefaults.geolocationServiceName,
  );
  geolocate.save();
}

export function locationError(error) {
  const text = `Geolocation API failed to obtain current position.
    Error code: ${error.code} |
    ${error.message}`;
  geolocate.appendMessage(
    geolocate.chatId,
    text,
    chatDefaults.geolocationServiceName,
  );
  geolocate.save();
}

export default geolocate;
