(function(window, document, undefined) {
  'use strict';

  const parser = new DOMParser();

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      let doc = parser.parseFromString(xhr.responseText, 'text/html');
      const pages = doc.querySelector('.pages').innerText;
      const res = pages.match(/Page \d+ of (\d+)/);
      const npages = parseInt(res[1], 10);

      const re = /(?:wwww*\d*\.)?(.+\.gov\.jm)/;
      let csv = 'Domain Name,Agency\n';

      for (let i = 1; i <= npages; i++) {
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            doc = parser.parseFromString(xhr.responseText, 'text/html');

            let links =
                doc.getElementById('links').getElementsByTagName('li');

            let len = links.length;
            for (let j = 0; j < len; j++) {
              let url = links[j].getElementsByTagName('span')[0].innerText;

              url = url.trim();

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

              let agency =
                  links[j].getElementsByTagName('strong')[0].innerText;

              let pos = agency.indexOf(',');
              if (pos !== -1) {
                agency = '"' + agency + '"';
              }

              csv += domainName + ',' + agency + '\n';
            }
          }
        };
        xhr.open('GET', '/government/links/page/' + i, false);
        xhr.send();
      }

      console.log(csv);
    }
  };
  xhr.open('GET', '/government/links/', true);
  xhr.send();
})(window, document);
