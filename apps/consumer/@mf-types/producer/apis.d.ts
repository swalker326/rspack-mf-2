
    export type RemoteKeys = 'producer/RemoteEntry';
    type PackageType<T> = T extends 'producer/RemoteEntry' ? typeof import('producer/RemoteEntry') :any;