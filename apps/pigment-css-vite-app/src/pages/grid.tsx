import * as React from 'react';
import Grid from '@pigment-css/react/Grid';
import { styled } from '@pigment-css/react';

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ced7e0;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
`;

const items = [
  { id: '1', size: 2},
  { id: '2', size: 2},
]

export default function InteractiveGrid() {

  return (
    <div sx={{ p: 2}}>
    <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={12}
        sx={{ width: '100%' }}
      >
        {items.map(({ id, size, offset, extraText}) => (
          <Grid key={id} size={size} offset={offset}><Card>Item {id}{extraText}</Card></Grid>
        ))}
      </Grid>
      </div>
  );
}
