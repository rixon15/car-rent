import Footer from "../components/sharedComponents/Footer";
import NavbarAuth from "../components/sharedComponents/NavbarAuth";
import NavbarNoAuth from "../components/sharedComponents/NavbarNoAuth";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white w-full flex flex-row">
      <div className="container mx-2 sm:mx-auto">
        <header>{user ? <NavbarAuth /> : <NavbarNoAuth />}</header>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
