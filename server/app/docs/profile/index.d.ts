declare const profile: {
    '/api/v1/profile/me': {
        get: {
            tags: string[];
            security: {
                JWT: any[];
            }[];
            summary: string;
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
    '/api/v1/profile/me/wallet': {
        get: {
            tags: string[];
            security: {
                JWT: any[];
            }[];
            summary: string;
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
    '/api/v1/profile/me/referral-code': {
        patch: {
            tags: string[];
            security: {
                JWT: any[];
            }[];
            summary: string;
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
    '/api/v1/profile/me/topup': {
        post: {
            tags: string[];
            security: {
                JWT: any[];
            }[];
            summary: string;
            consumes: string[];
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    example: {
                        amount: number;
                    };
                };
            }[];
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
    '/api/v1/profile/me/withdraw': {
        post: {
            tags: string[];
            security: {
                JWT: any[];
            }[];
            summary: string;
            consumes: string[];
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    example: {
                        amount: number;
                    };
                };
            }[];
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
export default profile;
