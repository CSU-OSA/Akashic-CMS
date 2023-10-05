export default (policyContext) => {
    const media = policyContext.request.files['files.media'];

    if (!media) {
      return false;
    }

    return true;
};
