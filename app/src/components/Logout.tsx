import { useLogout } from "@features/authentication/logout/hooks/useLogout";
import CircleIcon from "./CircleIcon";

function Logout({ size = 1.8 }) {
  const { logout } = useLogout();

  return (
    <CircleIcon
      data-testid="logout-icon"
      onClick={() => logout()}
      $icon="Logout"
      $padding={0.2}
      $size={size}
      $color="var(--color-text)"
      $bgColor="var(--color-pattern)"
    />
  );
}

export default Logout;
