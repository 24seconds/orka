self.addEventListener('install', event => {
  // TODO: Cache files or later
  console.log('[SW] install called');
  console.log('[SW] event is ', event);
});

self.addEventListener('activate', event => {
  console.log('[SW] activate called');
  console.log('[SW] event is ', event);

  event.waitUntil(self.clients.claim())

});

self.addEventListener('message', event => {
  // keep service worker alive
  if (event.data === 'ping') {
    return;
  }

  console.log('[SW] message called');
  console.log('[SW] event is ', event);

  
})

self.addEventListener('fetch', event => {
  console.log('[SW] fetch called');
  console.log('[SW] event is ', event);

  const url = event.request.url;
  console.log('[SW] url is ', url);

  if (url.endsWith('/test')) {
    const data = JSON.stringify({ test: "hahahah response"});
    return event.respondWith(new Response(data));
  }
});


function getReadableStream(port) {
  return new ReadableStream({
    start(controller) {
      port.onmessage = event => {
        const { data } = event;

        // TODO: Parse chunk (header + data) and determine close
        if (data === 'end') {
          controller.close();
          return;
        }

        if (data === 'abort') {
          controller.error('Abort download!');
          return;
        }

        // TODO: Parse chunk (header + data) and enqueue data only
        controller.enqueue(data);
      }
    }
  })
}