function getImageBlob(file) {
  const blob = URL.createObjectURL(file);
  return blob;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const generalHelpers = {
  getImageBlob,
  capitalizeFirstLetter,
};
