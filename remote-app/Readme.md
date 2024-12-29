The reason why the code that usually resides in index.tsx is moved to bootstrap.tsx is,

we are getting "Uncaught Error: Shared module is not available for eager consumption: webpack/sharing/consume/default/react/react".

By importing bootstrap.tsx into index.tsx, we will ensure it will be loaded after react dependencies are loaded.
