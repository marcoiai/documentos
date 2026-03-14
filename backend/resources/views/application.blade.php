<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta
        name="description"
        content="Able Pro Admin Template – Built with Vuetify, Vue, Laravel, and Vue Router for a smooth and efficient development experience."
        />
        <link rel="icon" href="{{ asset('favicon.svg') }}" />
        
        <title>Able pro - Vue3 with laravel Based admin dashboard template</title>
        
        @vite(['resources/ts/main.ts'])
        
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
