import Hidden from '@pigment-css/react/Hidden';

export default function HiddenDemo() {
  return (
    <div>
      <Hidden smDown>
        <div>Hidden on small screens and down</div>
      </Hidden>
      <Hidden mdUp>
        <div>Hidden on medium screens and up</div>
      </Hidden>
      <Hidden only="sm">
        <div>Hidden on sm</div>
      </Hidden>
      <Hidden only={['md', 'xl']}>
        <div>Hidden on md and xl</div>
      </Hidden>
    </div>
  );
}
