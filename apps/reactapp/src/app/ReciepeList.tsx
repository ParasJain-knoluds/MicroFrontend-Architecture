import React, { useState, useRef, useEffect } from 'react';
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {Button, styled} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse';

export default function ReciepeList() {
    const [data, setData] = useState([])
    interface ExpandMoreProps extends IconButtonProps {
        expand: boolean;
    }

    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        const getInfo = function getInfo1() {
            return new Promise((resolve, reject) => {
                fetch("http://localhost:3000/users/", {
                    method: 'GET',
                })
                    .then(
                        response => response.json(),
                        () => {
                            reject()
                            return null
                        }
                    )
                    .then(data1 => {
                        if (data1) {
                            resolve(data1)
                        }
                    })
            })
        }
        getInfo().then(reciepe => {
            const response = reciepe
            setData(response);
        })
    }, [])

    return (
        <Box>
          <a
            style={{ textDecoration: 'none' }}
            href='http://localhost:4200'
          >
            <Button id='back'>BACK</Button>
          </a>
            <Grid container sx={{ px: "2", flexWrap: "nowrap", marginTop: '5.5rem', mx: "2%" }}>
                {data.map(card => (
                    <Grid item xs={12} sm={6} md={8}>
                        <Card
                            sx={{
                                backgroundColor: '#FFFFFF',
                                height: '100%',
                                position: 'relative',
                                width: '85%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 5,
                                justifyContent: 'space-between',
                                ':hover': {
                                    boxShadow: 10,
                                },
                            }}
                        >
                            <div>
                                <CardMedia
                                    component='img'
                                    image={card.foodImage}
                                    alt='random'
                                    sx={{ height: '15rem' }}
                                />
                                <CardContent sx={{ display: "flex", width: "100%", paddingBottom: "0px"}}>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                    <Typography
                                        gutterBottom
                                        variant='h4'
                                        component='div'
                                        sx={{
                                            color: '#4E58B3',
                                            px: "25%",
                                            fontSize: '24px',
                                            fontWeight: 'Bold',
                                        }}
                                    >
                                        {card.racipeName}
                                    </Typography>
                                </CardContent>
                            </div>
                            <CardActions disableSpacing sx={{ justifyContent: 'flex-end', padding: "0%" }}>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                        aside for 10 minutes.
                                    </Typography>

                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

}
