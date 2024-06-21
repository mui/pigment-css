import * as React from 'react';
import Grid from '../../src/Grid';

function BasicUsageSpec() {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid size={8} offset={2}>
        <span>size=8</span>
      </Grid>
    </Grid>
  );
}

function ResponsiveSpec() {
  return (
    <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 6, sm: 12 }}>
      <Grid size={{ xs: 1, sm: 2 }} offset={{ xs: 0, sm: 1 }}>
        <span>size=8</span>
      </Grid>
      {/* @ts-expect-error invalid breakpoint */}
      <Grid size={{ invalid: 1 }}>
        <span>invalid breakpoint</span>
      </Grid>
    </Grid>
  );
}

function SizeValuesSpec() {
  return (
    <Grid container spacing={2}>
      <Grid size="auto">
        <span>auto</span>
      </Grid>
      <Grid size={6}>
        <span>size=6</span>
      </Grid>
      <Grid size="grow">
        <span>grow</span>
      </Grid>
      {/* @ts-expect-error invalid size value */}
      <Grid size="invalid">
        <span>invalid size value</span>
      </Grid>
    </Grid>
  );
}

function OffsetValueSpec() {
  return (
    <Grid container spacing={2}>
      <Grid size={6} offset={2}>
        <span>size=6 offset=2</span>
      </Grid>
      {/* @ts-expect-error invalid offset value */}
      <Grid size={6} offset="invalid">
        <span>invalid offset value</span>
      </Grid>
    </Grid>
  );
}
