import { useState } from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddDocument from "./AddDocument";
import AddAnEvent from "../Events/AddAnEvent";
import DocumentsList from "./DocumentsList";

const ADDEVENT = "Add Event";
const ADDDOC = "Add Document";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const AddEventOrDoc = ({ userInfo }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [reloadDocument, setReloadDocument] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Route exact path="/addevent">
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label={ADDEVENT} />
            <Tab label={ADDDOC} />
          </Tabs>
        </Paper>
        {value ? (
          <>
            <AddDocument
              userInfo={userInfo}
              reloadDocument={reloadDocument}
              setReloadDocument={setReloadDocument}
            />
            <DocumentsList
              reloadDocument={reloadDocument}
              setReloadDocument={setReloadDocument}
            />
          </>
        ) : (
          <AddAnEvent />
        )}
      </Route>
    </div>
  );
};

export default AddEventOrDoc;
