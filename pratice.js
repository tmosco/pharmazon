


<ListItem>
<Controller
  name="name"
  control={control}
  defaultValue=""
  rules={{
    required: true,
    minLength: 2,
  }}
  render={({ field }) => (
    <TextField
      variant="outlined"
      fullWidth
      id="name"
      label="Name"
      inputProps={{ type: 'name' }}
      {...field}
      error={Boolean(errors.name)}
      helperText={
        errors.email
          ? errors.name.type === 'minLength'
            ? 'Name length is more than 1'
            : 'Name is required'
          : ''
      }
    ></TextField>
  )}
></Controller>
</ListItem>