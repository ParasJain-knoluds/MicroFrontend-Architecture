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
import { Button, styled } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse';

export default function ProductList() {
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
                fetch("http://localhost:3000/products/", {
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
        getInfo().then(product => {
            const response = product
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
            <Grid container sx={{ px: "2", flexWrap: "wrap", flexDirection: "row", marginTop: '5.5rem' }}>
                {data.map(card => (
                    <Grid item xs={4} sm={4} md={4} lg={3} sx={{ marginTop: "40px" }}>
                        <Card
                            sx={{
                                backgroundColor: '#FFFFFF',
                                height: '100%',
                                position: 'relative',
                                width: '90%',
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
                                    image={card.productImage}
                                    alt='random'
                                    sx={{ height: '15rem' }}
                                />
                                <CardContent sx={{ display: "flex",flexDirection: "column", alignItems: "center", width: "100%", marginTop: "6px", padding: "0px"}}>
                                    <Typography
                                        gutterBottom
                                        variant='h4'
                                        component='div'
                                        sx={{
                                            color: '#4E58B3',
                                            // px: "35%",
                                            fontSize: '24px',
                                            fontWeight: 'Bold',
                                        }}
                                    >
                                        {card.productName}
                                    </Typography>
                                    <Typography paragraph>
                                        {card.description}
                                    </Typography>

                                </CardContent>
                            </div>
                            {/* <CardActions disableSpacing sx={{ justifyContent: 'flex-end', padding: "0%" }}>
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
                                       {card.description}
                                    </Typography>

                                </CardContent>
                            </Collapse> */}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

}
