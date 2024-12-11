declare global {
    interface Window {
        fbAsyncInit?: () => void;
        FB: typeof FB;
    }

    var FB: {
        init: (options: {
            appId: string;
            autoLogAppEvents?: boolean;
            xfbml?: boolean;
            version: string;
        }) => void;
        [key: string]: any; // To account for other methods provided by Facebook SDK
    };
}

export {};