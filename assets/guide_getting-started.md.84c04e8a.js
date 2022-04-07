import{_ as a,c as e,o as n,a as s}from"./app.764b808c.js";const m=`{"title":"Getting Started","description":"","frontmatter":{},"headers":[{"level":2,"title":"Run spa-server by docker","slug":"run-spa-server-by-docker"},{"level":2,"title":"Run spa-client in npm project","slug":"run-spa-client-in-npm-project"},{"level":2,"title":"Run spa-client by docker","slug":"run-spa-client-by-docker"},{"level":2,"title":"What's More","slug":"what-s-more"}],"relativePath":"guide/getting-started.md"}`,t={},o=s(`<h1 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h1><p>This section will help you bring spa-server up, and upload your static web files to it.</p><h2 id="run-spa-server-by-docker" tabindex="-1">Run spa-server by docker <a class="header-anchor" href="#run-spa-server-by-docker" aria-hidden="true">#</a></h2><p><code>uploading file</code> feature needs spa-server open admin-server. So we should create a config file first.</p><div class="language-bash"><pre><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&#39;
port = 8080
addr = &quot;0.0.0.0&quot;
file_dir = &quot;/data&quot;

admin_config {
  port = 9000
  addr = &quot;0.0.0.0&quot;  
  token = &quot;token&quot;
}
&#39;</span> <span class="token operator">&gt;</span> config.conf

$ <span class="token function">docker</span> run -it -p <span class="token number">8080</span> -p <span class="token number">9000</span> -v <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/config.conf:/config.conf <span class="token punctuation">\\</span>
timzaak/spa-server:latest
</code></pre></div><h2 id="run-spa-client-in-npm-project" tabindex="-1">Run spa-client in npm project <a class="header-anchor" href="#run-spa-client-in-npm-project" aria-hidden="true">#</a></h2><ol><li>Install spa-client npm package.</li></ol><div class="language-shell"><pre><code><span class="token function">npm</span> <span class="token function">install</span> spa-client dotenv --save-dev
</code></pre></div><ol start="2"><li>add config for spa-client in the <code>.env</code> file</li></ol><div class="language-dotenv"><pre><code># all config start with \`SPA\` for spa-client
SPA_SERVER_ADDRESS=http://127.0.0.1:9000

SPA_SERVER_AUTH_TOKEN=token

# upload file parallel number, optional, default is 3
SPA_UPLOAD_PARALLEL=3
</code></pre></div><ol start="3"><li>Add script to package.json (need <code>dotenv</code>). <code>www.example.com</code> is the domain of your website, and <code>./build</code> is directory of static web files.</li></ol><div class="language-json"><pre><code><span class="token punctuation">{</span>
  <span class="token property">&quot;script&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;upload&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dotenv .env spa-client upload ./build www.example.com&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;release&quot;</span><span class="token operator">:</span><span class="token string">&quot;dotenv .env spa-client release www.example.com&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="run-spa-client-by-docker" tabindex="-1">Run spa-client by docker <a class="header-anchor" href="#run-spa-client-by-docker" aria-hidden="true">#</a></h2><p>spa-client config support environment variables and file, for simple, we use environment variables to inject config.</p><div class="language-shell"><pre><code>$ <span class="token function">docker</span> run --rm -it -v /path/build:/build <span class="token punctuation">\\</span>
 -e <span class="token assign-left variable">SPA_SERVER_ADDRESS</span><span class="token operator">=</span><span class="token string">&#39;http://127.0.0.1:9000&#39;</span> <span class="token punctuation">\\</span>
 -e <span class="token assign-left variable">SPA_SERVER_AUTH_TOKEN</span><span class="token operator">=</span><span class="token string">&#39;token&#39;</span> <span class="token punctuation">\\</span>
 timzaak/spa-client:lastest <span class="token punctuation">\\</span>
 spa-client upload ./build www.example.com <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
 spa-client release www.example.com
</code></pre></div><p>By now, your single page application is in serving at <code>http://www.example.com:8080</code>.(please add this dns record to your host)</p><h2 id="what-s-more" tabindex="-1">What&#39;s More <a class="header-anchor" href="#what-s-more" aria-hidden="true">#</a></h2><ul><li>a React example for spa-client: <a href="https://github.com/timzaak/spa-server/blob/master/example/js-app-example/README.md" target="_blank" rel="noopener noreferrer">js-app-example</a>.</li><li>spa-server <a href="./spa-server-configuration.html">configuration</a> and its admin-server <a href="./spa-server-api.html">http api</a></li><li>spa-client <a href="./spa-client-command-line.html">commands</a> and <a href="./spa-client-npm-package.html">npm package</a></li></ul>`,18),p=[o];function r(l,i,c,d,u,h){return n(),e("div",null,p)}var g=a(t,[["render",r]]);export{m as __pageData,g as default};
