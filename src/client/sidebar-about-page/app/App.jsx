import React from 'react';

import { Button } from '@mui/material';
import { AppWrapper } from './App.style';
import { serverFunctions } from '../../utils/serverFunctions';

// import { TreeViewMenu } from "../components/treeview/treeview";

function App() {
  return (
    <AppWrapper>
      <Button
        variant="outlined"
        onClick={() => serverFunctions.openDialogMUI()}
      >
        Make SQL 2
      </Button>
      {/* <TreeViewMenu /> */}
    </AppWrapper>
  );
}

export default App;
