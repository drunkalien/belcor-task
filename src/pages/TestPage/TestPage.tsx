import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Stack,
  Dialog,
  DialogTitle,
  Button,
  Container,
  DialogActions,
  CardContent,
  CardHeader,
  LinearProgress,
  Card,
  Divider,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { fetchResults } from "../../features/results/resultsSlice";
import { RootState, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTests } from "../../features/tests/testsSlice";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "score",
    headerName: "Score",
    width: 150,
  },
];

const TestPage = () => {
  const [open, setOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const form = useForm();
  const [correct, setCorrect] = useState(0);
  const { results, loading } = useSelector((state: RootState) => state.results);
  const { testId } = useParams();
  const test = useSelector((state: RootState) => state.tests.testData);

  const currentTest = test.find((t) => t.id === testId);
  const questions = currentTest?.questions;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  function handleClose() {
    setOpen(false);
    setCorrect(0);
  }

  function submit(data: Record<string, string>) {
    const correctCount = questions?.reduce((acc, question) => {
      const currentAnswer = data[`question-${question.id}`];
      if (currentAnswer === question.correctAnswer) {
        return acc + 1;
      }

      return acc;
    }, 0);

    setCorrect(correctCount ?? 0);
    setOpen(true);
  }

  function handleResultsOpen() {
    dispatch(fetchResults());
    setResultsOpen(true);
  }

  function handleResultsClose() {
    setResultsOpen(false);
  }

  return (
    <Container>
      <Card>
        <CardHeader subheader="Test" title={currentTest?.title} />
        {loading && <LinearProgress />}
        <CardContent>
          <form onSubmit={form.handleSubmit(submit)}>
            <Stack spacing={2} divider={<Divider />}>
              {questions?.map((question, index) => {
                return (
                  <Controller
                    control={form.control}
                    name={`question-${question.id}`}
                    key={question.id}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl>
                        <FormLabel>
                          {index + 1}. {question.question}
                        </FormLabel>
                        <RadioGroup {...field}>
                          {question.choices.map((choice) => (
                            <FormControlLabel
                              defaultValue=""
                              key={choice.id}
                              value={choice.id}
                              control={<Radio />}
                              label={choice.choice}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                );
              })}
            </Stack>
            <Button type="submit" variant="contained" sx={{ my: 2 }}>
              Submit
            </Button>
            <Dialog open={open}>
              <DialogTitle>
                You have answered correctly {correct} out of 10 questions.
              </DialogTitle>
              <DialogActions>
                <Button variant="contained" onClick={handleResultsOpen}>
                  See other results
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={resultsOpen}>
              <Table columns={columns} rows={results || []} />
              <DialogActions>
                <Button onClick={handleResultsClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TestPage;
