const formatAsDate = (stringDate: string): string => {
  const date = new Date(stringDate);
  return date.toLocaleDateString();
};

const formatAsTime = (stringDate: string): string => {
  const date = new Date(stringDate);
  return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
};

const readFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result as string);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsDataURL(file);
  });
}

export {
  formatAsDate,
  formatAsTime,
  readFileAsDataUrl,
};