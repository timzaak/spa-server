import{_ as e,c as n,o as t,a as o}from"./app.33b64e60.js";const _='{"title":"Configuration","description":"","frontmatter":{},"headers":[{"level":2,"title":"Overview","slug":"overview"},{"level":2,"title":"Config Reference","slug":"config-reference"}],"relativePath":"guide/spa-server-configuration.md"}',i={},a=o(`<h1 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-hidden="true">#</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>The config format is <a href="https://github.com/lightbend/config/blob/main/HOCON.md" target="_blank" rel="noopener noreferrer">HOCON(Human-Optimized Config Object Notation)</a>.</p><p>The config default path is &#39;./config.conf&#39;, you can change it by environment <code>SPA_CONFIG</code>.</p><h2 id="config-reference" tabindex="-1">Config Reference <a class="header-anchor" href="#config-reference" aria-hidden="true">#</a></h2><div class="language-hocon"><pre><code># http bind, if set port &lt;= 0, will disable http server(need set https config)
port = 80
addr = &quot;0.0.0.0&quot;

# directory to store static web files. if you use docker, please mount a persistence volume for it.
file_dir = &quot;/data&quot;

# enable cors, default is false, its implementation is simple now.
# Access-Control-Allow-Origin: $ORIGIN
# Access-Control-Allow-Methods: OPTION,GET,HEAD
# Access-Control-Max-Age: 3600
// cors = true

# https config, optional
//https {
//  # default value for https ssl
//  ssl {
//    # private ssl key
//    private = &quot;private.key path&quot;,
//    # public ssl cert
//    public = &quot;public.cert path&quot;
//  }

//  # https bind address
//  port = 443
//  addr = &quot;0.0.0.0&quot;

//  # if set true, http server(80) will send client
//  # status code:301(Moved Permanently) to tell client redirect to https
//  # optional, default is false
//  http_redirect_to_https = false
//}



# default cache config
//cache {
//  # if file size &gt; max_size, it will not be cached. default is 10485760 (10MB).
//  max_size = 10MB

//  # http header Cache-Control config,
//  # optional, if not set, won&#39;t sender this header to client
//  client_cache = [{
//    expire = 30d
//    extension_names = [icon,gif,jpg,jpeg,png,js]
//  }, {
//    // set 0, would set Cache-Control: no-cache
//    expire = 0
//    extension_names = [html]
//  }]

//  # gzip compression for js/json/icon/json, default is false,
//  # only support gzip algo, and only compress cached files,
//  # be careful to set it true
//  compression = false

//}

//# admin server config
//# admin server don&#39;t support hot reload. the config should not change.
//# optional, and it&#39;s disabled by default.
//# if you use spa-client to upload files, control version. Need to open it
//admin_config {
//# bind host
//  port = 9000
//  addr = &quot;127.0.0.1&quot;

//  # this is used to check client request
//  # put it in http header,  Authorization: Bearer $token
//  token = &quot;token&quot;

//  # max file size allowed to be uploaded,
//  # default is 30MB(30*1024*1024)
//  max_upload_size = 31457280

//  # delete deprecated version by cron
//  deprecated_version_delete {
//    # default value: every day at 3am.
//    cron: &quot;0 0 3 * * *&quot;,
//    # default value is 2
//    max_preserve: 2,
//  }
//}


# optional, domains specfic config, it will use the default config if not set
//domains = [{
//  # domain name
//  domain: &quot;www.example.com&quot;,
//  // optional, same with cache config, if not set, will use default cache config.
//  cache: {
//    client_cache:\${cache.client_cache}
//    max_size: \${cache.max_size}
//    client_cache = \${cache.client_cache}
//  },
//  # cors
//  cors: \${cors},
//  # domain https config, if not set, will use default https config.
//  https: {
//    ssl: \${https.ssl}
//    http_redirect_to_https: \${https.http_redirect_to_https}
//  }
//}]
</code></pre></div>`,6),s=[a];function r(c,l,d,p,h,f){return t(),n("div",null,s)}var g=e(i,[["render",r]]);export{_ as __pageData,g as default};
