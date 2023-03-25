function showAlert(message) {
  alert(message);
}

function copyToClipboard(text) {
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

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({
      id: 'new',
      title: 'New',
    });
    chrome.contextMenus.create({
      id: 'new_docs',
      parentId: 'new',
      title: 'New Docs',
    });
    chrome.contextMenus.create({
      id: 'new_sheet',
      parentId: 'new',
      title: 'New SpreadSheet',
    });
    chrome.contextMenus.create({
      id: 'new_slide',
      parentId: 'new',
      title: 'New Slide',
    });
    chrome.contextMenus.create({
      id: 'new_form',
      parentId: 'new',
      title: 'New Form',
    });

    chrome.contextMenus.create({
      id: 'convert',
      title: 'Convert',
    });
    chrome.contextMenus.create({
      id: 'convert_to_preview',
      parentId: 'convert',
      title: 'To Preview',
    });
    chrome.contextMenus.create({
      id: 'convert_to_edit',
      parentId: 'convert',
      title: 'To Edit',
    });
    chrome.contextMenus.create({
      id: 'convert_to_copy',
      parentId: 'convert',
      title: 'To Copy',
    });
    chrome.contextMenus.create({
      id: 'convert_to_template',
      parentId: 'convert',
      title: 'To Template',
    });

    chrome.contextMenus.create({
      id: 'download_link',
      title: 'Download Link',
    });
    chrome.contextMenus.create({
      id: 'download_pdf',
      parentId: 'download_link',
      title: 'PDF',
    });
    chrome.contextMenus.create({
      id: 'download_docx',
      parentId: 'download_link',
      title: 'DOCX',
    });
    chrome.contextMenus.create({
      id: 'download_xlsx',
      parentId: 'download_link',
      title: 'XLSX',
    });
    chrome.contextMenus.create({
      id: 'download_pptx',
      parentId: 'download_link',
      title: 'PPTX',
    });
    chrome.contextMenus.create({
      id: 'download_csv',
      parentId: 'download_link',
      title: 'CSV',
    });
  });
});

chrome.contextMenus.onClicked.addListener((item) => {
  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  function alertMessage(message) {
    getCurrentTab().then((tab) => {
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func: showAlert,
          args: [message],
        })
        .then(() => console.log(message));
    });
  }

  let url = '';
  const GoogleUrlRegex =
    /https:\/\/docs.google.com\/(document|spreadsheets|presentation|forms)\/d\/(.*)\/.*/;

  // New
  if (item.parentMenuItemId === 'new') {
    switch (item.menuItemId) {
      case 'new_docs':
        url = 'https://docs.new';
        break;
      case 'new_sheet':
        url = 'https://sheets.new';
        break;
      case 'new_slide':
        url = 'https://slides.new';
        break;
      case 'new_form':
        url = 'https://forms.new';
        break;
    }
  }
  // Convert
  if (item.parentMenuItemId === 'convert') {
    if (!GoogleUrlRegex.test(item.pageUrl)) {
      alertMessage('This page is not available for convert.');
      return;
    }

    const spreaded = item.pageUrl.match(GoogleUrlRegex);
    const service = spreaded[1];
    const fileId = spreaded[2];
    switch (item.menuItemId) {
      case 'convert_to_preview':
        url = `https://docs.google.com/${service}/d/${fileId}/preview`;
        break;
      case 'convert_to_edit':
        url = `https://docs.google.com/${service}/d/${fileId}/edit`;
        break;
      case 'convert_to_copy':
        url = `https://docs.google.com/${service}/d/${fileId}/copy`;
        break;
      case 'convert_to_template':
        url = `https://docs.google.com/${service}/d/${fileId}/template/preview`;
        break;
    }
  }

  // Download
  if (item.parentMenuItemId === 'download_link') {
    if (!GoogleUrlRegex.test(item.pageUrl)) {
      alertMessage('This page is not available for download.');
    }

    const spreaded = item.pageUrl.match(GoogleUrlRegex);
    const service = spreaded[1];
    const fileId = spreaded[2];
    switch (item.menuItemId) {
      case 'download_pdf':
        getCurrentTab().then((tab) => {
          chrome.scripting
            .executeScript({
              target: { tabId: tab.id },
              func: copyToClipboard,
              args: [`https://docs.google.com/${service}/d/${fileId}/export?format=pdf`],
            })
            .then(() => console.log("Copied to clipboard!"));
        });
        break;
      case 'download_docx':
        if (service !== 'document') {
          alertMessage('This page is not available for download.');
          return;
        }
        getCurrentTab().then((tab) => {
          chrome.scripting
            .executeScript({
              target: { tabId: tab.id },
              func: copyToClipboard,
              args: [`https://docs.google.com/${service}/d/${fileId}/export?format=doc`],
            })
            .then(() => console.log("Copied to clipboard!"));
        });
        break;
      case 'download_xlsx':
        if (service !== 'spreadsheets') {
          alertMessage('This page is not available for download.');
          return;
        }
        getCurrentTab().then((tab) => {
          chrome.scripting
            .executeScript({
              target: { tabId: tab.id },
              func: copyToClipboard,
              args: [`https://docs.google.com/${service}/d/${fileId}/export?format=xlsx`],
            })
            .then(() => console.log("Copied to clipboard!"));
        });
        break;
      case 'download_pptx':
        if (service !== 'presentation') {
          alertMessage('This page is not available for download.');
          return;
        }
        getCurrentTab().then((tab) => {
          chrome.scripting
            .executeScript({
              target: { tabId: tab.id },
              func: copyToClipboard,
              args: [`https://docs.google.com/${service}/d/${fileId}/export?format=pptx`],
            })
            .then(() => console.log("Copied to clipboard!"));
        });
        break;
      case 'download_csv':
        if (service !== 'spreadsheets') {
          alertMessage('This page is not available for download.');
          return;
        }
        getCurrentTab().then((tab) => {
          chrome.scripting
            .executeScript({
              target: { tabId: tab.id },
              func: copyToClipboard,
              args: [`https://docs.google.com/${service}/d/${fileId}/export?format=csv`],
            })
            .then(() => console.log("Copied to clipboard!"));
        });
        break;
    }
  }

  // New tab with url
  if (url.length > 0) {
    chrome.tabs.create({
      url: url,
    });
  }
});
