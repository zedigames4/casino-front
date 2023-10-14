declare const statistics: {
    '/api/v1/statistics/income-expenses': {
        get: {
            tags: string[];
            description: string;
            security: {
                JWT: any[];
            }[];
            summary: string;
            parameters: {
                in: string;
                name: string;
                description: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            consumes: string[];
            responses: {
                200: {
                    description: string;
                };
                201: {
                    description: string;
                };
                400: {
                    description: string;
                };
                401: {
                    description: string;
                };
                403: {
                    description: string;
                };
                404: {
                    description: string;
                };
                409: {
                    description: string;
                };
                500: {
                    description: string;
                };
            };
        };
    };
    '/api/v1/statistics/chart': {
        get: {
            tags: string[];
            description: string;
            security: {
                JWT: any[];
            }[];
            summary: string;
            parameters: {
                in: string;
                name: string;
                description: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            consumes: string[];
            responses: {
                200: {
                    description: string;
                };
                201: {
                    description: string;
                };
                400: {
                    description: string;
                };
                401: {
                    description: string;
                };
                403: {
                    description: string;
                };
                404: {
                    description: string;
                };
                409: {
                    description: string;
                };
                500: {
                    description: string;
                };
            };
        };
    };
};
export default statistics;
