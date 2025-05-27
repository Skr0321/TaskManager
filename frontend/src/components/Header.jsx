import { Button } from "./ui/button";

function Header() {
  return (
    <div className="flex justify-between items-center bg-2 mb-4">
      <h3 className="mb-0">Task Manager</h3>
      <div className="flex gap-3">
        <Button>Login</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
}

export default Header;
