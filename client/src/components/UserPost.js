import * as React from "react";
import { useState, useLayoutEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { ThemeProvider } from "@mui/styles";
import { theme } from "../Theme";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ForumIcon from "@mui/icons-material/Forum";
import NewCommentBar from "./NewCommentBar";
import shortid from "shortid";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function UserPost(props) {
  const auth = useSelector((state) => state.auth);
  const likesLength = props.postLikes.length;
  const [expanded, setExpanded] = React.useState(false);
  const [width] = useWindowSize();

  const cardWidth = width > 1000 ? "700px" : width > 800 ? "500px" : "";
  const cardHeight = width > 1000 ? "700px" : width > 800 ? "470px" : "";
  const CardMediaHeight = width > 1000 ? 350 : width > 800 ? 290 : 192;

  const isLiked = () => {
    props.postLikes.map((like) => {
      if (like._id === auth.user._id) return true;
      else return false;
    });
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          border: "1px solid rgba(0,116,232)",
          bgcolor: "rgba(13,41,70)",
          my: "20px",
          maxHeight: "auto",
          borderRadius: "10px",
        }}
        style={{ width: `${cardWidth}`, minheight: `${cardHeight}` }}
      >
        <CardHeader
          avatar={
            <Avatar alt={props.creatorName} src={`${props.creatorAvatar}`} />
          }
          title={props.creatorName}
          style={{ color: "#fff" }}
        />
        {props.media.endsWith(".mp4") ? (
          <CardMedia
            component="video"
            height={`${CardMediaHeight}`}
            src={`${props.media}`}
            allowFullScreen
            muted
            controls
          />
        ) : (
          <CardMedia
            component="img"
            height={`${CardMediaHeight}`}
            image={`${props.media}`}
            alt="Image not Found"
          />
        )}
        <CardContent>
          <Typography variant="body2" style={{ color: "#fff" }}>
            {props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Badge badgeContent={likesLength} color="primary">
            <IconButton aria-label="add to favorites" disabled>
              {likesLength > 0 ? (
                isLiked ? (
                  <FavoriteIcon color="primary" />
                ) : (
                  <FavoriteBorderIcon color="primary" />
                )
              ) : (
                <FavoriteBorderIcon color="primary" />
              )}
            </IconButton>
          </Badge>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ForumIcon style={{ color: "#fff" }} />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <NewCommentBar postId={props.postId} />
          {props.postComments.map((comment) => (
            <CardContent key={shortid.generate()}>
              <Comment
                comment={comment}
                postId={props.postId}
                key={shortid.generate()}
              />
            </CardContent>
          ))}
        </Collapse>
      </Card>
    </ThemeProvider>
  );
}
