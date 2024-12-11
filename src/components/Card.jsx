import React from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CardWrap = ({ title, id }) => (
  <Link to={`/content/${id}`} style={{ textDecoration: "none" }}>
    <Card  elevation={7} height="20" sx={{ m:"15px"}}>
    <CardContent sx={{ p:"10px", '&:last-child': { pb: 0, pt:0 }}}>
    <Typography variant="h7" component="div">
      <h3>{title}</h3>
      </Typography>
      </CardContent>
    </Card>
  </Link>

);

export default CardWrap;
