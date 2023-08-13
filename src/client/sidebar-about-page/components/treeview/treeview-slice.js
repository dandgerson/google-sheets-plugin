import { createSlice, nanoid } from '@reduxjs/toolkit';
// import { RootState } from '../../app/store';
import { getSchemesTree } from './helpers';
// import { getSchemesTree } from './helpers';

// export interface TreeviewState {
//   value: any;
//   status: 'idle' | 'loading' | 'failed';
// }

const initialState = {
  value: {},
  status: 'idle',
};

const buildTree = (data) => {
  console.log('buildTree', { data });
  const tree = {
    id: 'root',
    name: 'cloud data',
    type: 'connection',
    children: [
      {
        id: nanoid(),
        name: 'in2sql_epm_core',
        type: 'database',
        // children: getSchemesTree(data || []),
        children: getSchemesTree([]),
      },
    ],
  };

  return tree;
};

const resolveHasChildren = (type) => {
  return ['shemes', 'tables'].includes(type);
};

const makeChildNodes = ({ data, parent }) => {
  console.log({ data });
  return data.map((item) => ({
    id: nanoid(),
    name: item['VALUE'],
    type: item['TYPE'] ?? (parent.type === 'table' && 'column'),
    parentName: parent.name,
    children: resolveHasChildren(item['TYPE']) ? [] : null,
  }));
};

const findNodeById = (node, id) => {
  let result;
  const recursive = (node, id) => {
    if (node.id === id) {
      result = node;
      return true;
    }

    if (Array.isArray(node.children)) {
      node.children.forEach((childNode) => recursive(childNode, id));
    }
  };

  recursive(node, id);

  return result;
};

export const treeviewSlice = createSlice({
  name: 'treeview',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateTree: (state, action) => {
      state.value = buildTree(action.payload.data);
    },
    enrichTree: (state, action) => {
      console.log({ action });
      const { node, data } = action.payload;
      if (!data) return state;

      const childNodes = makeChildNodes({
        data,
        parent: node,
      });

      const parent = findNodeById(state.value, node.id);

      if (childNodes.length) {
        parent.children = childNodes;
      }
    },
  },
});

export const { updateTree, enrichTree } = treeviewSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTreeview = (state) => state.treeview.value;

export default treeviewSlice.reducer;
