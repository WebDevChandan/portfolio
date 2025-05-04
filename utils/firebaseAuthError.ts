export function isFirebaseAuthError(error: any): error is { code: string } {
    return error && typeof error.code === 'string';
}
