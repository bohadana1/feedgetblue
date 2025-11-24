export default {
  async fetch(request) {
    try {
      const { searchParams } = new URL(request.url);
      const feedUrl = searchParams.get("u");
      if (!feedUrl) {
        return new Response("Missing ?u= feed URL", { status: 400 });
      }

      const upstream = await fetch(feedUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0)",
          "Accept": "application/xml,text/xml,*/*;q=0.1",
        }
      });

      const xml = await upstream.text();

      return new Response(xml, {
        status: 200,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (err) {
      return new Response("Worker error: " + err, { status: 500 });
    }
  }
};
