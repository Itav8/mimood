interface FormProps {
  type?: string
  title: string
}
export const Form = (props: FormProps) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}
