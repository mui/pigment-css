function App(props) {
  return (
    <main>
      <div
        sx={{
          color: props.tier.title === 'Professional' ? 'grey.50' : undefined,
          mb: 1,
        }}
      />
    </main>
  );
}
