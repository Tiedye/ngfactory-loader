# ngfactory-loader

`npm i ngfactory-loader -S`

Serves the same purpose the html-loader does, except operatates on compiled *.ngfactory.ts files.

## Usage

Put this in the loader pipline just before your typescript loader.

```
{
    test: /\.ts$/,
    loaders: ['awesome-typescript', 'ngfactory', ...]
}, ...
```

## Compatibility

This has been tested with these versions of @angular/compiler-cli:
- 0.6.2