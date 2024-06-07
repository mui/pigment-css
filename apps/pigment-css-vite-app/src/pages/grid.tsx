import * as React from 'react';
import Grid from '@pigment-css/react/Grid';
import { styled } from '@pigment-css/react';

const Card = styled.div`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
  padding: 8px 16px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  background-color: rgb(26, 32, 39);
  width: 100%;
  text-wrap: nowrap;
  color: white;
`;

const items = [
  { id: '1', size: 1, offset: 0},
  { id: '2', size: 1, offset: 0},
  { id: '3', size: 1, offset: 0},
  { id: '4', size: 1, offset: 0},
  { id: '5', size: 1, offset: 0},
  { id: '6', size: 1, offset: 0},
]

export default function InteractiveGrid() {

  return (
    <Grid
        container
        columnSpacing={2}
        rowSpacing={1}
        columns={{ xs: 2, md: 6 }}
        direction={'row'}
        sx={{ width: '100%' }}
      >
        {items.map(({ id, size, offset}) => (
          <Grid key={id} size={size} offset={offset}><Card>Item {id}</Card></Grid>
        ))}
      </Grid>
  );
}
