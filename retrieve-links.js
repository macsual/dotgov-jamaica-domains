(function(window, document, undefined) {
  'use strict';

  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === XMLHttpRequest.DONE &&
          httpRequest.status === 200) {
      const parser = new DOMParser();

      const doc =
        parser.parseFromString(httpRequest.responseText, 'text/html');

      // const pages = doc.querySelector('.pages').innerText;

      // const res = pages.match(/Page \d+ of (\d+)/);
      // const npages = parseInt(res[1], 10);

      const links = doc.getElementById('links').getElementsByTagName('li');

      const re = /(?:www\.)?(.+\.gov\.jm)/;

      let csv = "";

      const len = links.length;
      for (let i = 0; i < len; i++) {
        let url = links[i].getElementsByTagName('span')[0].innerText;

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'http://' + url;
        }

        let parsedUrl = null;
        try {
          parsedUrl = new URL(url);
        } catch (e) {
          console.log('' + e);
          continue;
        }

        let hostname = parsedUrl.hostname;

        let arr = hostname.match(re);
        if (arr === null) {
          console.log('not a .gov.jm hostname: ' + hostname);
          continue;
        }

        let domainName = arr[1];

        let agency = links[i].getElementsByTagName('strong')[0].innerText;
        csv += domainName + ',' + agency + '\n';
      }

      console.log(csv);
    }
  };
  httpRequest.open('GET', '/government/links/', true);
  httpRequest.send();
})(window, document);
