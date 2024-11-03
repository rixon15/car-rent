import NavbarAuth from "../components/NavbarAuth";
import NavbarNoAuth from "../components/NavbarNoAuth";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white w-full flex flex-row">
        <div className="container mx-auto">
      <header>{user ? <NavbarAuth /> : <NavbarNoAuth />}</header>
    </div>
    </div>
  );
};

export default HomePage;
