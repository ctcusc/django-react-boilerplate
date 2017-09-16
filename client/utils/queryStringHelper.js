export default function (parameters) {
  let string = '?';

  for (const key of Object.keys(parameters)) {
    string += `${key}=${parameters[key]}&`;
  }

  return string.slice(0, -1);
}
