<!DOCTYPE html>

<html>

<head>
    <meta charset=utf-8 />
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>GraphQL Playground</title>

    <link rel="stylesheet"
          href="{{\MLL\GraphQLPlayground\DownloadAssetsCommand::cssPath()}}"
    />
    <link rel="shortcut icon"
          href="{{\MLL\GraphQLPlayground\DownloadAssetsCommand::faviconPath()}}"
    />
    <script src="{{\MLL\GraphQLPlayground\DownloadAssetsCommand::jsPath()}}"></script>
</head>

<body>

<div id="root"/>
<script type="text/javascript">
    window.addEventListener('load', function () {
        const root = document.getElementById('root');

        function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        GraphQLPlayground.init(root, {
            endpoint: "{{url(config('graphql-playground.endpoint'))}}",
            settings: {
                'request.credentials': 'same-origin',
            },
            headers: {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
            },
            subscriptionEndpoint: "{{config('graphql-playground.subscriptionEndpoint')}}",
        })
    })
</script>

</body>
</html>
