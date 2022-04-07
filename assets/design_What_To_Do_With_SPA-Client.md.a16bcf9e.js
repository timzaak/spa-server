import{_ as e,c as t,o,a}from"./app.764b808c.js";const g='{"title":"What to do with SPA-Client","description":"","frontmatter":{},"headers":[{"level":2,"title":"What to do with SPA-Client","slug":"what-to-do-with-spa-client"},{"level":3,"title":"What problems it solves?","slug":"what-problems-it-solves"},{"level":3,"title":"How To Do","slug":"how-to-do"},{"level":3,"title":"Why use Rust","slug":"why-use-rust"},{"level":3,"title":"One future of spa-client","slug":"one-future-of-spa-client"},{"level":2,"title":"Design of spa-client","slug":"design-of-spa-client"},{"level":3,"title":"configure","slug":"configure"},{"level":3,"title":"Fast","slug":"fast"},{"level":3,"title":"Interact with JS","slug":"interact-with-js"}],"relativePath":"design/What_To_Do_With_SPA-Client.md"}',i={},s=a('<h2 id="what-to-do-with-spa-client" tabindex="-1">What to do with SPA-Client <a class="header-anchor" href="#what-to-do-with-spa-client" aria-hidden="true">#</a></h2><p>This doc describes why <code>spa-client</code> needs to exist and the future of it.</p><h3 id="what-problems-it-solves" tabindex="-1">What problems it solves? <a class="header-anchor" href="#what-problems-it-solves" aria-hidden="true">#</a></h3><p>People would never try anything new if it looks same or worse to something they are family with and needs lots cost to try. Comparing Nginx, <code>spa-server</code> do something better for static web server, but no 10x better than <code>nginx</code>. So there are rare people would like to try it.</p><p><code>spa-client</code> solve the above problem by providing an easy way to interact with <code>spa-server</code>.</p><p>Give people a try to use it replacing Nginx or other static web server by:</p><p><strong>One Command, Everything Is Ok!</strong></p><h3 id="how-to-do" tabindex="-1">How To Do <a class="header-anchor" href="#how-to-do" aria-hidden="true">#</a></h3><p>With this target, we should make a lot of tools.</p><ul><li>Command client <code>spa-client</code> for users of DevOps/Backend.</li><li>js wrapped <code>spa-client</code> to let users of frontend developers can integrate it with their project seamless.</li></ul><p>After that, we also need to make binary of Linux/Mac/Window, and upload them to GitHub page to let users get it easily.</p><h3 id="why-use-rust" tabindex="-1">Why use Rust <a class="header-anchor" href="#why-use-rust" aria-hidden="true">#</a></h3><p>Maybe it may be good to use Typescript to integrate frontend project. But the command line is also important.</p><h3 id="one-future-of-spa-client" tabindex="-1">One future of <code>spa-client</code> <a class="header-anchor" href="#one-future-of-spa-client" aria-hidden="true">#</a></h3><p>We will try to integrate <code>spa-client</code> with Nginx later. Maybe it&#39;s too hard to let people use <code>spa-server</code>.</p><h2 id="design-of-spa-client" tabindex="-1">Design of <code>spa-client</code> <a class="header-anchor" href="#design-of-spa-client" aria-hidden="true">#</a></h2><h3 id="configure" tabindex="-1">configure <a class="header-anchor" href="#configure" aria-hidden="true">#</a></h3><p>Configure should be allowed environment variables, files and command line options. There may have some secret configs which is not allowed to expose to environment variable.</p><p><s>Hocon format may not be a good choice for config, because people use <code>JSON</code> a lot in frontend area. and these plugins need to add extra package to parse Hocon format config file.</s></p><h3 id="fast" tabindex="-1">Fast <a class="header-anchor" href="#fast" aria-hidden="true">#</a></h3><p>fast is not a good feature, and people do not need fast client with different reasons, we would provide config option about the size of parallel uploading.</p><h3 id="interact-with-js" tabindex="-1">Interact with JS <a class="header-anchor" href="#interact-with-js" aria-hidden="true">#</a></h3><p>Use <code>NAPI-RS</code> to do this.</p>',23),n=[s];function r(l,d,h,c,p,u){return o(),t("div",null,n)}var w=e(i,[["render",r]]);export{g as __pageData,w as default};
