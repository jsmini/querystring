export as namespace jsminiQuerystring;

interface parseOption {
    sep?: string;
    eq?: string;
    ignoreQueryPrefix?: boolean;
    decode?: (x: string, isKey?: boolean) => string;
    filter?: (v: string, k?: string) => boolean;
    convert?: (v: string, k?: string) => any;
    reduce?: (prev: object, v: string, k?: string) => object;
}

interface stringifyOption {
    sep?: string;
    eq?: string;
    addQueryPrefix?: boolean;
    encode?: (x: string, isKey?: boolean) => string;
    filter?: (v: any, k?: string) => boolean;
    convert?: (v: any, k?: string) => any;
    reduce?: (prev: object[], v: any, k?: string) => object[];
}

export function parse(str: string, option?: parseOption): object;
export function stringify(obj: object, option?: stringifyOption): string;
