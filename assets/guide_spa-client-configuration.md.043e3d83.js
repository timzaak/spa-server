import{_ as e,c as n,o as a,a as r}from"./app.efe36196.js";const _='{"title":"Configuration","description":"","frontmatter":{},"headers":[{"level":2,"title":"Overview","slug":"overview"},{"level":2,"title":"Reference","slug":"reference"}],"relativePath":"guide/spa-client-configuration.md"}',o={},t=r(`<h1 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-hidden="true">#</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>You can set config file path by <code>config-dir</code> commandline option or by environment variables <code>SPA_CLIENT_CONFIG</code>, you can also set all config by environment variables like <a href="https://github.com/timzaak/spa-server/blob/master/example/js-app-example/.env" target="_blank" rel="noopener noreferrer">.env</a>. Config override order is command line option &gt; config file &gt; environment.</p><h2 id="reference" tabindex="-1">Reference <a class="header-anchor" href="#reference" aria-hidden="true">#</a></h2><div class="language-hocon"><pre><code># admin server address and auth
server {
  # required
  address: &quot;http://127.0.0.1:9000&quot;
  # required
  auth_token: &quot;token&quot;
}

# uploading file thread number.
upload {
  # optional, default value is 3.
  parallel: 3
}
</code></pre></div>`,5),i=[t];function d(c,s,l,u,f,h){return a(),n("div",null,i)}var v=e(o,[["render",d]]);export{_ as __pageData,v as default};
