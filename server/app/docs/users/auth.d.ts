declare const users: {
    '/api/v1/auth/login': {
        post: {
            tags: string[];
            security: any[];
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    example: {
                        email: string;
                        password: string;
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
    };
    '/api/v1/auth/signup': {
        post: {
            tags: string[];
            security: any[];
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    example: {
                        firstName: string;
                        lastName: string;
                        phoneNumber: string;
                        email: string;
                        password: string;
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
    };
    '/api/v1/auth/logout': {
        post: {
            tags: string[];
            security: {
                JWT: any[];
            }[];
            summary: string;
            parameters: any[];
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
    '/auth/forget-password': {
        post: {
            tags: string[];
            security: any[];
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    example: {
                        email: string;
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
    };
    '/auth/reset-password': {
        put: {
            tags: string[];
            security: any[];
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    example: {
                        password: string;
                        token: string;
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
    };
};
export default users;
