import { Ownable } from "../../types/trait";

export function isOwner(ctx: any, ownable: Ownable) {
    const { id: userId } = ctx.state.user;

    if (!ownable) {
      ctx.throw(404, 'Resource not found');
    }

    return ownable.owners.some(owner => owner.id === userId);
}
