declare module "remoteApp/Button" {
  interface ButtonProps {
    label: string;
    onClick: () => void;
  }

  const Button: React.ComponentType<ButtonProps>;
  export default Button;
}
