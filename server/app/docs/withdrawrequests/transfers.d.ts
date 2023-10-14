declare const withdrawrequests: {
    '/api/v1/withdrawrequests': {
        post: {
            tags: string[];
            security: {
                JWT: any[];
            }[];
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    example: {
                        amount: number;
                        receiverPhoneNumber: string;
                    };
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
        get: {
            tags: string[];
            security: {
                JWT: any[];
            }[];
            summary: string;
            parameters: ({
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    example?: undefined;
                };
                description?: undefined;
            } | {
                in: string;
                name: string;
                required: boolean;
                description: string;
                schema: {
                    type: string;
                    example: string;
                };
            })[];
            description: string;
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
    '/api/v1/withdrawrequests/{id}': {
        get: {
            tags: string[];
            security: {
                JWT: any[];
            }[];
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
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
    '/api/v1/withdrawrequests/{id}/decide': {
        post: {
            tags: string[];
            security: {
                JWT: any[];
            }[];
            summary: string;
            parameters: ({
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    example?: undefined;
                };
            } | {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    example: {
                        decision: string;
                    };
                    type?: undefined;
                };
            })[];
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
export default withdrawrequests;
