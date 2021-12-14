import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  editableTitle: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  editableTitleContainer: {
    marginLeft: theme.spacing(1),
    display: 'flex',
  },
  input: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: theme.spacing(1),
    '&:focus': {
      background: '#ddd'
    }
  }
}));

export default useStyles;