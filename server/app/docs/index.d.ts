declare const config: {
    swagger: string;
    info: {
        version: string;
        title: string;
        description: string;
    };
    basePath: string;
    schemes: string[];
    securityDefinitions: {
        JWT: {
            type: string;
            name: string;
            in: string;
        };
    };
    tags: {
        name: string;
    }[];
    consumes: string[];
    produces: string[];
    paths: {
        '/api/v1/winners/biggest': {
            get: {
                tags: string[];
                parameters: {
                    in: string;
                    name: string;
                    required: boolean;
                    schema: {
                        type: string;
                        example: number;
                    };
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
        '/api/v1/winners/latest': {
            get: {
                tags: string[];
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
        '/api/v1/transfers': {
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
                            receiver: string;
                            amount: number;
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
                description: string;
                parameters: {
                    in: string;
                    name: string;
                    description: string;
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
        '/api/v1/transfers/{id}': {
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
        '/api/v1/pay/oltranz': {
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
                            description: string;
                            telephoneNumber: string;
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
        '/api/v1/pay/oltranz/transfer': {
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
                            receiver: string;
                            description: string;
                            receiverAccount: string;
                            type: string;
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
        '/api/v1/settings': {
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
                            dollarToRwf: number;
                            isGlobal: boolean;
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
        '/api/v1/settings/{id}': {
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
                            dollarToRwf: number;
                            isGlobal: boolean;
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
        '/api/v1/transactions': {
            get: {
                tags: string[];
                security: {
                    JWT: any[];
                }[];
                summary: string;
                description: string;
                parameters: {
                    in: string;
                    name: string;
                    description: string;
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
        '/api/v1/transactions/{id}': {
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
        '/api/v1/bets': {
            post: {
                tags: string[];
                security: {
                    JWT: any[];
                };
                summary: string;
                parameters: {
                    in: string;
                    name: string;
                    required: boolean;
                    schema: {
                        example: {
                            game: string;
                            iWin: number;
                            iToBet: number;
                            status: string;
                            playerData: {
                                any: string;
                            };
                            currency: string;
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
        '/api/v1/bets/{id}': {
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
                            game: string;
                            iWin: number;
                            iToBet: number;
                            status: string;
                            playerData: {
                                any: string;
                            };
                            currency: string;
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
        '/api/v1/pay/mtn': {
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
                            amount: string;
                            currency: string;
                            payerMessage: string;
                            payeeNote: string;
                            partyId: string;
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
        '/api/v1/pay/mtn/{referenceId}': {
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
        '/api/v1/subscribers': {
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
        '/api/v1/subscribers/{id}': {
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
                            email: string;
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
        '/api/v1/wallets': {
            post: {
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
        '/api/v1/wallets/{id}': {
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
        '/api/v1/wallets/{id}/main-wallet': {
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
        '/api/v1/wallets/{id}/minimum-balance': {
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
                            minimumBalance: number;
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
        '/api/v1/games': {
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
                            images: string[];
                            title: string;
                            description: string;
                            url: string;
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
                security: any[];
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
        '/api/v1/games/{id}': {
            get: {
                tags: string[];
                security: any[];
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
                            images: string[];
                            title: string;
                            description: string;
                            url: string;
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
};
export default config;
