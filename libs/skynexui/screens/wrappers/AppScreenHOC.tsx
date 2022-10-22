export default function AppScreenHOC(Component: any) {
  return function Wrapper() {
    return (
      <Component />
    )
  };
}
