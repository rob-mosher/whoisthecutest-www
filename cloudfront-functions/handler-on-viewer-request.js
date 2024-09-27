// AWS runtime: 'cloudfront-js-2.0'
// This function is intended to run as part of the 'Viewer Request' event in CloudFront, where it
// checks and redirects requests from 'www.whoisthecutest.com' to 'whoisthecutest.com'.

function handler(event) {
  var request = event.request;
  var headers = request.headers;

  var bareDomain = 'whoisthecutest.com';

  if (headers.host && headers.host.value === 'www.' + bareDomain) {
    return {
      statusCode: 308,
      statusDescription: 'Permanent Redirect',
      headers: {
        // Redirects to the bare domain without preserving the path (request.uri).
        // Since the site is a single-page application, only the base domain is needed for the redirect.
        location: { value: 'https://' + bareDomain },
      },
    };
  }

  // If the host doesn't match 'www.whoisthecutest.com', proceed without redirection.
  return request;
}
