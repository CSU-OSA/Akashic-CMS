export function isAuthenticated(ctx: any) {
    return !!ctx.state.user;
}
