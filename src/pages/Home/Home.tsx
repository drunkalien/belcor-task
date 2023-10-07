import {
  Container,
  Typography,
  CardContent,
  CardActions,
  Button,
  Card,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTests } from "../../features/tests/testsSlice";
import { RootState, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";

const Home = () => {
  const tests = useSelector((state: RootState) => state.tests.testData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  return (
    <Container>
      <Stack spacing={2}>
        {tests.map((test) => (
          <Card variant="outlined" key={test.id}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {test.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {test.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={"/tests/" + test.id}>
                <Button size="small">Take this test</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Home;
