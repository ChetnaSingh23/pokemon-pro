import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface CardComponentProps {
  id: number;
  name: string;
  height: number;
  weight: number;
  listOfAbilities: string[];
  image: string;
}

export const CardComponent = ({id, name, height, weight, listOfAbilities, image}: CardComponentProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} style={{padding: '10px', margin: '10px' }}>
      <CardActionArea
        onClick={() => {
          navigate(`/pokemon/${id}`);
        }}
      >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
					{name}
        </Typography>
        <div>
          <Typography gutterBottom variant="subtitle2" component="span">
            {'Height: '}
          </Typography>
          <Typography gutterBottom variant="body2" component="span" color="text.secondary">
            {height}
          </Typography>
        </div>
        <div>
          <Typography gutterBottom variant="subtitle2" component="span">
            {'Weight: '}
          </Typography>
          <Typography gutterBottom variant="body2" component="span" color="text.secondary">
            {weight}
          </Typography>
        </div>
        
        <Typography variant="subtitle2">
          Abilities:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <ul>
            {listOfAbilities.map((ability, index) => {
              return <li key={index}>{ability}</li>
            })}
          </ul>
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}
