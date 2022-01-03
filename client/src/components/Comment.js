import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function Comment(props) {
  return (
    <Card
      sx={{ maxWidth: 300 }}
      style={{
        backgroundColor: "rgba(0,116,232)",
        borderRadius: "20px",
        width: "345px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            alt={props.comment.createdByName}
            src={props.comment.createdByPicture}
          ></Avatar>
        }
        title={props.comment.createdByName}
        style={{ color: "white", backgroundColor: "rgba(10,25,41)" }}
      />
      <CardContent>
        <Typography variant="body2" style={{ color: "white" }}>
          {props.comment.commentData}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Comment;
