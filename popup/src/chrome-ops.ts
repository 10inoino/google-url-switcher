export type service = 'document' | 'spreadsheets' | 'presentation' | 'forms';

export const createNewPage = (service: service) => {
  let url = '';
  switch (service) {
    case 'document':
      url = 'https://docs.new';
      break;
    case 'spreadsheets':
      url = 'https://sheets.new';
      break;
    case 'presentation':
      url = 'https://slides.new';
      break;
    case 'forms':
      url = 'https://forms.new';
      break;
  }
  chrome.tabs.create({ url });
};
