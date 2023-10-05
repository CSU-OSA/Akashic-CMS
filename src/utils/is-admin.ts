export function isAdmin(ctx: any) {
  if (!ctx.state.user) {
    return false;
  }
  return String(ctx.state.user.role.name).toLocaleLowerCase() === 'admin';
}
