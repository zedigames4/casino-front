declare const paths: {
    '/': {
        get: {
            tags: string[];
            summary: string;
            operationId: string;
            requestBody: {
                description: string;
                content: {
                    'application/json': {
                        schema: {};
                    };
                    'application/xml': {
                        schema: {};
                    };
                };
                required: boolean;
            };
            responses: {
                '200': {
                    description: string;
                    content: {};
                };
            };
            'x-codegen-request-body-name': string;
        };
    };
};
export default paths;
