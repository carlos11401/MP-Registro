// // Encriptar un string
// export const encryptData = (password: string): string => {
//     return CryptoJS.AES.encrypt(
//         JSON.stringify(password),
//         process.env.SECRET_KEY as string
//     ).toString();
// };

export const isPasswordValid = (
    passwordEntered: string,
    passwordEncrypted: string
): boolean => {
        return passwordEntered === passwordEncrypted;
};
