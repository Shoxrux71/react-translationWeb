declare const Getlanguages: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly platform: {
                    readonly type: "string";
                    readonly default: "api";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "api";
                };
                readonly code: {
                    readonly type: "string";
                    readonly default: "en_GB";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "the language code in the format “language code_code of the country”, which is used to display the names of the languages. The language code is represented only in lowercase letters, the country code only in uppercase letters (example en_GB, es_ES, ru_RU etc). If this option is not present, then English is used by default";
                };
            };
            readonly required: readonly ["platform"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly err: {
                    readonly type: "string";
                    readonly description: "the text of the error. It is null if the response status is 200. Otherwise, it contains a string";
                };
                readonly result: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly full_code: {
                                readonly type: "string";
                                readonly description: "the language code in the format “language code_code of the country”";
                            };
                            readonly code_alpha_1: {
                                readonly type: "string";
                                readonly description: "the language code in the “language code” format";
                            };
                            readonly englishName: {
                                readonly type: "string";
                                readonly description: "English name of the language";
                            };
                            readonly codeName: {
                                readonly type: "string";
                                readonly description: "the language name translated using the language specified by the query parameter “code”";
                            };
                            readonly flagPath: {
                                readonly type: "string";
                                readonly description: "the relative address of which is the image of the country flag. Example static/flags/afrikaans. The full address for downloading the flag will be https://backenster.com/v2/static/flags/afrikaans.png. In order to download flags in increased resolutions, you should add to this parameter: @2x or @3x (example https://backenster.com/v2/static/flags/afrikaans@2x.png or  https://backenster.com/v2/static/flags/afrikaans@3x.png)";
                            };
                            readonly testWordForSyntezis: {
                                readonly type: "string";
                                readonly description: "a word for testing a speech synthesizer";
                            };
                            readonly modes: {
                                readonly type: "array";
                                readonly description: "an array of objects, each of which is a description of the function that is supported in the given language";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "name of the function. Currently, only 4 functions are widely supported: “Speech synthesis“, “Image recognition“, “Translation“, “Speech recognition“";
                                        };
                                        readonly value: {
                                            readonly type: "boolean";
                                            readonly description: "logical value true or false, which shows the status of the function: on or off";
                                        };
                                        readonly genders: {
                                            readonly type: "boolean";
                                            readonly description: "logical value true or false, which shows the ability to synthesize speech for both sexes. Displayed only for function “Speech synthesis“";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly properties: {
                readonly err: {
                    readonly type: "string";
                    readonly description: "the text of the error. It is null if the response status is 200. Otherwise, it contains a string";
                    readonly examples: readonly ["Token absent"];
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostTranslate: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["to", "data", "platform"];
        readonly properties: {
            readonly from: {
                readonly type: "string";
                readonly description: "the language code in the format “language code_code of the country” from which the text is translated. The language code is represented only in lowercase letters, the country code only in uppercase letters (example en_GB, es_ES, ru_RU and etc.). If this parameter is not present, the auto-detect language mode is enabled";
                readonly examples: readonly ["en_GB"];
            };
            readonly to: {
                readonly type: "string";
                readonly description: "language code in the format “language code_code of the country” to which the text is translated (required)";
                readonly examples: readonly ["de_DE"];
            };
            readonly data: {
                readonly oneOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                }];
                readonly description: "data for translation";
                readonly examples: readonly ["London is the capital and largest city of England and of the United Kingdom."];
            };
            readonly translateMode: {
                readonly type: "string";
                readonly enum: readonly ["html"];
                readonly description: "Describe the input text format. Possible value is \"html\" for  translating and preserving html structure. If value is not  specified or is other than \"html\" than plain text is translating.  ";
            };
            readonly enableTransliteration: {
                readonly type: "boolean";
                readonly description: "If true response includes sourceTransliteration and targetTransliteration fields.\n          platform:";
            };
            readonly platform: {
                readonly type: "string";
                readonly description: "api";
                readonly default: "api";
                readonly examples: readonly ["api"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["err", "result"];
            readonly properties: {
                readonly err: {
                    readonly type: "string";
                    readonly description: "the text of the error. It is null if the response status is 200. Otherwise, it contains a string";
                };
                readonly result: {
                    readonly oneOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    }];
                    readonly description: "result of translation. In the event that a line was sent to the translation, the result is also a string; if an array of strings, then we also get an array of strings";
                    readonly examples: readonly ["London ist die Hauptstadt und größte Stadt Englands und des Vereinigten Königreichs."];
                };
                readonly sourceTransliteration: {
                    readonly type: "string";
                    readonly description: "return only if enableTransliteration request param is true. Transliteration of source data. In the event that a line was sent to the translation, the result is also a string; if an array of strings, then we also get an array of strings";
                    readonly examples: readonly ["London is the capital and largest city of England and of the United Kingdom."];
                };
                readonly targetTransliteration: {
                    readonly type: "string";
                    readonly description: "return only if enableTransliteration request param is true. Transliteration results. In the event that a line was sent to the translation, the result is also a string; if an array of strings, then we also get an array of strings";
                    readonly examples: readonly ["London ist die Hauptstadt und grosste Stadt Englands und des Vereinigten Konigreichs."];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly properties: {
                readonly err: {
                    readonly type: "string";
                    readonly description: "the text of the error. It is null if the response status is 200. Otherwise, it contains a string";
                    readonly examples: readonly ["Token absent"];
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { Getlanguages, PostTranslate };
