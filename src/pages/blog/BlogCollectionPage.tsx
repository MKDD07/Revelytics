import React from "react";
import { PageWrapper } from "../../layouts/PageWrapper";
import { BlogStandardArea, TpBlogMasonaryArea } from "../../components/sections/blog";

export const BlogCollectionPage: React.FC = () => {
  return (
    <PageWrapper>
      <BlogStandardArea />
      <TpBlogMasonaryArea />
    </PageWrapper>
  );
};

export default BlogCollectionPage;
