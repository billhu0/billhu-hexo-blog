'use strict';

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

// Google site verification
hexo.extend.injector.register(
    'head_end',
    `<meta name="google-site-verification" content="IqNfw3GiMxuhw7kYoEdhMJoh3j99KHuGI9bw00hPn2c" />`,
    'default'
);

// Custom font
hexo.extend.injector.register(
    'head_end',
    `<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'></link>`,
    'default'
);
