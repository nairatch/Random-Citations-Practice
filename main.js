function xhrRequest(method, url, body = {}) {
const xhr = new XMLHttpRequest();
xhr.open(method, url);
if (method !== "GET") {
xhr.setRequestHeader("Content-Type", "application/json");
}
  xhr.send(JSON.stringify(body));
  return new Promise((resolve, reject) => {
    xhr.onerror = () => {
      reject(JSON.parse(xhr.response));
    };
    xhr.onload = () => {
      if ([200, 201].includes(xhr.status)) {
        resolve(JSON.parse(xhr.response));
      }
      reject(JSON.parse(xhr.response));
    };
  });
}

//fetch("https://api.everrest.educata.dev/quote/random")
//  .then((res) => res.json())
//  .then((response) => {
//    console.log(response);
//  })
//  .catch((err) => {
//    console.log(err);
//  });

function displayQuote(quote) {
  console.log ("Starting to request code");
  const table = `
    <table class="table table-bordered  w-50">
      <thead">
        <tr>
          <th>Header</th>
          <th>Contents</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Quote</td>
          <td>"${quote.quote}"</td>
        </tr>
        <tr>
          <td>Author</td>
          <td>${quote.author}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>${quote.type}</td>
        </tr>
      </tbody>
    </table>
  `;
  setTimeout(() => {
    console.log("Timeout");
}, 3000);
  console.log ("Quote received");
  document.getElementById('quoteContainer').innerHTML = table;
}
  
document.getElementById('randomQuoteBtn').addEventListener('click', () => {
  xhrRequest('GET', 'https://api.everrest.educata.dev/quote/random')
    .then(quote => {
      localStorage.setItem('savedQuote', JSON.stringify(quote));
      displayQuote(quote);
    })
    .catch(error => {
      console.error('Error', error);
      document.getElementById('quoteContainer').innerHTML = '<p class="text-danger">Failed to load quote. Please try again.</p>';
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const savedQuote = localStorage.getItem('savedQuote');
  if (savedQuote) {
    displayQuote(JSON.parse(savedQuote));
  }
});
