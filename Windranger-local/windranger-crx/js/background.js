chrome.webRequest.onBeforeRequest.addListener(
  (detail) => {
    console.log(detail);
    if (detail.url !== 'http://127.0.0.1:7001/url') {
      $.ajax({
        url: "http://127.0.0.1:7001/url",
        method: "post",
        type: "POST",
        dataType: "json",
        data: {
          url: detail.url,
          method: detail.method
        },
        success: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);



