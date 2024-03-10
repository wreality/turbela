<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset=utf-8 />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
    <title>GraphiQL</title>
    <style>
        body {
            height: 100%;
            margin: 0;
            width: 100%;
            overflow: hidden;
        }

        #graphiql {
            height: 100vh;
        }
    </style>
    <script src="{{ \MLL\GraphiQL\DownloadAssetsCommand::reactPath() }}"></script>
    <script src="{{ \MLL\GraphiQL\DownloadAssetsCommand::reactDOMPath() }}"></script>
    <link rel="stylesheet" href="{{ \MLL\GraphiQL\DownloadAssetsCommand::cssPath() }}" />
    <link rel="shortcut icon" href="{{ \MLL\GraphiQL\DownloadAssetsCommand::faviconPath() }}" />
</head>

<body>

    <div id="graphiql">Loading...</div>
    <script src="{{ \MLL\GraphiQL\DownloadAssetsCommand::jsPath() }}"></script>
    <script src="https://unpkg.com/@graphiql/plugin-explorer@1.0.3/dist/index.umd.js"></script>
    <script src="https://account.lndo.site/js/keycloak.js"></script>
    <script>
        const keycloak = new Keycloak({
            url: 'https://account.lndo.site',
            realm: 'patrons',
            clientId: 'turbela-client',
        });


        keycloak.init({
            onLoad: 'login-required',
            redirectUri: 'https://turbela.lndo.site/graphiql',
        })

        const explorerPlugin = GraphiQLPluginExplorer.explorerPlugin();

        function GraphiQLWithExplorer() {
            const [query, setQuery] = React.useState('');
            const [token, setToken] = React.useState(keycloak.token);
            const fetcher = GraphiQL.createFetcher({
                url: '{{ url(config('graphiql.endpoint')) }}',
                subscriptionUrl: '{{ config('graphiql.subscription-endpoint') }}',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            keycloak.onAuthSuccess = function() {
                setToken(keycloak.token)
            }

            keycloak.onReady = function() {
                setToken(keycloak.token)
            }


            return React.createElement(GraphiQL, {
                fetcher: fetcher,
                query: query,
                onEditQuery: setQuery,
                defaultEditorToolsVisibility: true,
                plugins: [explorerPlugin],

            });
        }

        ReactDOM.render(
            React.createElement(GraphiQLWithExplorer),
            document.getElementById('graphiql'),
        );
    </script>

</body>

</html>
