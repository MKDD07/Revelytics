import React from "react";
import { PageWrapper } from "../../layouts/PageWrapper";
import { TpBannerThumb, PostboxArea, TpBlogGridArea } from "../../components/sections/blog";

export const BlogDetailsPage: React.FC = () => {
  return (
    <PageWrapper>
      <TpBannerThumb />
      <PostboxArea />
      <TpBlogGridArea />
    </PageWrapper>
  );
};

export default BlogDetailsPage;
