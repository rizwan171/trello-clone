import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    marginTop: theme.spacing(2)
  },
  addCard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    backgroundColor: '#EBECF0',
    '&:hover': {
      filter: "brightness(80%)",
    }
  }
}));

export default useStyles;