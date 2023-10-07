import { Container, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <>
      <Container>
        <Box py={2} mb={4} component="header">
          <Box
            component="nav"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Link to="/">
                <Button>Home</Button>
              </Link>
            </Box>
            {!user && (
              <Box
                component="div"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Link to="/login">
                  <Button variant="contained">Login</Button>
                </Link>
                <Link to="/sign-up">
                  <Button variant="outlined">Sign Up</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      {children}
    </>
  );
};

export default Layout;
