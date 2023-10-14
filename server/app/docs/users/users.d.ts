declare const users: {
    '/api/v1/users': {
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
    '/api/v1/users/{id}': {
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
        put: {
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
                        firstName: string;
                        lastName: string;
                        phoneNumber: string;
                        email: string;
                        password: string;
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
        delete: {
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
    '/api/v1/users/{userId}/referrals': {
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
};
export default users;
