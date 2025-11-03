export const ProviderEnum={
    GOOGLE:"GOOGLE",
    FACEBOOK:"FACEBOOK",
    EMAIL:"EMAIL"
}

export type ProviderEnumType= typeof ProviderEnum[keyof typeof ProviderEnum]