import * as React from "react";
import UserPost from "../components/UserPost";
import { useSelector } from "react-redux";

export default function ImageList() {
  const userProfile = useSelector((state) => state.userProfile);
  return (
    <div
      className="image-list"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {userProfile.posts.map((post) => (
        <UserPost
          creator={post.createdById}
          description={post.description}
          media={post.file}
          creatorName={post.createdByName}
          creatorAvatar={post.createdByPicture}
          key={post._id}
          postLikes={post.likes}
          postId={post._id}
          postComments={post.comments}
        />
      ))}
    </div>
  );
}
