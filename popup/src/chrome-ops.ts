export type service = 'document' | 'spreadsheets' | 'presentation' | 'forms';
type status = 'preview' | 'edit' | 'copy' | 'template';
type downloadFormat = 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'csv';
export const GoogleUrlRegex =
/https:\/\/docs.google.com\/(document|spreadsheets|presentation|forms)\/d\/(.*)\/.*/;

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

export const convert = (status: status) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const url = tabs[0].url;
		if (url) {
			const match = url.match(GoogleUrlRegex);
			if (match) {
				const service = match[1];
				const id = match[2];
				let newUrl = '';
				switch (status) {
					case 'preview':
						newUrl = `https://docs.google.com/${service}/d/${id}/preview`;
						break;
					case 'edit':
						newUrl = `https://docs.google.com/${service}/d/${id}/edit`;
						break;
					case 'copy':
						newUrl = `https://docs.google.com/${service}/d/${id}/copy`;
						break;
					case 'template':
						newUrl = `https://docs.google.com/${service}/d/${id}/template/preview`;
						break;
				}
				chrome.tabs.create({ url: newUrl });
			} else {
				alert('This page is not available for convert.');
			}
		}
	});
}

export const download = (format: downloadFormat) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const url = tabs[0].url;
		if (url) {
			const match = url.match(GoogleUrlRegex);
			if (match) {
				const service = match[1];
				const id = match[2];
				let newUrl = '';
				switch (format) {
					case 'pdf':
						newUrl = `https://docs.google.com/${service}/d/${id}/export?format=pdf`;
						break;
					case 'docx':
						if (service === 'document') {
							newUrl = `https://docs.google.com/${service}/d/${id}/export?format=doc`;
						} else {
							alert('This page is not available for download.');
						}
						break;
					case 'xlsx':
						if (service === 'spreadsheets') {
							newUrl = `https://docs.google.com/${service}/d/${id}/export?format=xlsx`;
						} else {
							alert('This page is not available for download.');
						}
						break;
					case 'pptx':
						if (service === 'presentation') {
							newUrl = `https://docs.google.com/${service}/d/${id}/export?format=pptx`;
						} else {
							alert('This page is not available for download.');
						}
						break;
					case 'csv':
						if (service === 'spreadsheets') {
							newUrl = `https://docs.google.com/${service}/d/${id}/export?format=csv`;
						} else {
							alert('This page is not available for download.');
						}
						break;
				}
				copyToClipboard(newUrl)
			} else {
				alert('This page is not available for download.');
			}
		}
	});
}

const copyToClipboard = (text: string) => {
	navigator.clipboard
  .writeText(text)
  .then(
    () => {
      alert('Copied to clipboard!');
    },
    () => {
      alert('Failed to copy to clipboard!');
    }
  );
}