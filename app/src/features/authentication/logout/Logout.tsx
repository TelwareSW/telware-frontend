import Button from "@components/Button";
import { useLogout } from "./hooks/useLogout";

function Logout() {
  const { logout } = useLogout();
  return <Button onClick={() => logout()}>logout</Button>;
}

export default Logout;
