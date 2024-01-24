import { PostProps } from "../types/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const PostCard = (props: PostProps) => {
  const handleDelete = (id: number) => {
    props.onDelete && props.onDelete(id);
  };

  return (
    <Card sx={{ maxWidth: 345, mt: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1682685797365-6f57bbebffed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.body}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <IconButton
          aria-label="add to favorites"
          onClick={() => handleDelete(props.id)}
        >
          <DeleteForeverIcon />
        </IconButton>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
