const MOBILE_RE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '/index.html') {
      const ua = request.headers.get('User-Agent') ?? '';
      if (MOBILE_RE.test(ua)) {
        const mobileUrl = new URL('/mobile.html', request.url);
        return env.ASSETS.fetch(new Request(mobileUrl.toString(), request));
      }
    }

    return env.ASSETS.fetch(request);
  },
};
