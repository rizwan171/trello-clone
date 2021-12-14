import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  card: {
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(0,1,1,1)
  },
  input: {
    margin: theme.spacing(1),
  },
  // btnConfirm: {
  //   backgroundColor: '#5aac44',
  //   color: '#fff',
  //   '&:hover': {
  //     filter: "brightness(80%)",
  //   }
  // },
  confirm: {
    margin: theme.spacing(0,1,1,1)
  }
}));

export default useStyle;