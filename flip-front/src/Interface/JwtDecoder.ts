export interface JwtDecoder {
    Role: string[],
    UserId: string,
    UserName: string,
    exp: number,
    iss: string
}