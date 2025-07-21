export type FormElementProps = {
  id?: string | undefined;
  required?: boolean | undefined;
  error?: boolean | undefined;
} & Pick<
  React.AriaAttributes,
  "aria-labelledby" | "aria-errormessage" | "aria-describedby" | "aria-invalid"
>;
