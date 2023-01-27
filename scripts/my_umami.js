
// hexo.extend.injector.register(
//     'head_end', 
//     '\n<script async defer data-website-id="068f1627-b763-4c2d-a8ce-17b7c30de5e2" src="https://umami.billhu.cn/umami.js"></script>\n', 
//     'default'
// );

// Microsoft analytics
hexo.extend.injector.register(
    'head_end',
    `<script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "fjnxcr4gva");
    </script>`,
    'default'
);

hexo.extend.injector.register(
    'body_end',
    `<script type="text/javascript">
        if (window.top.location.host == 'www.billhu.cn') {
            window.top.location.host = 'www.billhu.us';
        }
    </script>`,
    'default'
);

// Google site verification
hexo.extend.injector.register(
    'head_end',
    `<meta name="google-site-verification" content="IqNfw3GiMxuhw7kYoEdhMJoh3j99KHuGI9bw00hPn2c" />`,
    'default'
);
