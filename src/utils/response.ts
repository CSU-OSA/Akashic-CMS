export function makeResponse(ctx: any, status: 'success' | 'fail', msg: string, rest: Record<string, string | number> = {}) {
  ctx.response.status = 200;
  ctx.response.body = {
    code: status === 'success' ? 200 : 500,
    message: msg,
    ...rest,
  };
}
