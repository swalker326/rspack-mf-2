
    export type RemoteKeys = 'producer/App';
    type PackageType<T> = T extends 'producer/App' ? typeof import('producer/App') :any;